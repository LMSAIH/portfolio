import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const VERTEX = `
attribute vec2 aPos;
void main() {
    gl_Position = vec4(aPos, 0.0, 1.0);
}
`

// A planet limb seen from orbit: layered atmosphere, a sunrise blooming over the
// edge, a detached airglow band, and film grain. The canvas has no backdrop of its
// own, it only lays light over the page, so it blends with either theme.
const FRAGMENT = `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uDpr;
uniform float uLight;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// Decorrelated hash for the grain, the cheap one above shows patterns on a pixel grid
float grainHash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
    );
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = p * 2.03 + 17.0;
        a *= 0.5;
    }
    return v;
}

float gauss(float x, float w) {
    return exp(-(x * x) / (2.0 * w * w));
}

// Soft grain: a fine layer under a slightly larger interpolated one
float grain(vec2 frag, vec2 seed) {
    vec2 fine = floor(frag / max(1.0, uDpr * 0.5)) + seed;
    vec2 soft = frag / (uDpr * 1.1) + seed;
    vec2 i = floor(soft);
    vec2 f = fract(soft);
    f = f * f * (3.0 - 2.0 * f);
    float smoothN = mix(
        mix(grainHash(i), grainHash(i + vec2(1.0, 0.0)), f.x),
        mix(grainHash(i + vec2(0.0, 1.0)), grainHash(i + vec2(1.0, 1.0)), f.x),
        f.y
    );
    return (smoothN - 0.5) * 1.3 + (grainHash(fine) - 0.5) * 0.45;
}

void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 uv = frag / uRes;
    // The scene is measured in a unit that stops growing with the canvas, so a
    // tall section on a big monitor gets more empty sky rather than a bigger planet
    float unit = min(uRes.y, 520.0 * uDpr);
    float aspect = uRes.x / unit;
    float t = uTime;

    // Unit-normalised space, origin at bottom centre
    vec2 p = vec2((uv.x - 0.5) * aspect, frag.y / unit);
    float halfW = 0.5 * aspect;

    // Pick the planet radius so the limb always drops about the same amount
    // at the screen edges, whatever the aspect ratio
    float drop = 0.12;
    float R = max((halfW * halfW + drop * drop) / (2.0 * drop), 1.2);
    vec2 c = vec2(0.0, 0.52 - R);
    vec2 q = p - c;
    float d = length(q) - R;           // altitude above the limb
    float s = atan(q.x, q.y) * R;      // arc length along the limb, 0 at the apex
    float h = max(d, 0.0);
    float ws = clamp(halfW / 1.2, 0.45, 1.0);

    // Sun sits right on the limb, drifting and breathing slowly
    float s0 = halfW * 0.3 + sin(t * 0.05) * 0.04;
    vec2 sunPos = c + R * vec2(sin(s0 / R), cos(s0 / R));
    float r = length(p - sunPos);
    float ds = abs(s - s0);
    float rise = 0.88 + 0.12 * sin(t * 0.21);
    float warm = gauss(ds, 0.34 * ws) * rise;
    float lit = 0.38 + 0.62 * exp(-ds / (1.5 * ws));

    // Everything below is light emitted over the page, there is no backdrop:
    // the page background shows through wherever nothing glows

    // Atmosphere: hot thin rim, blue scattering, wide indigo haze
    // The light page has no blue atmosphere at all, only a pink sunset sky
    // that warms to peach towards the sun
    vec3 blue = mix(vec3(0.16, 0.42, 1.0), vec3(1.0, 0.55, 0.62), uLight);
    vec3 sky = vec3(0.7, 0.85, 1.0) * exp(-h / 0.006) * 0.6
        + blue * exp(-h / 0.035) * 0.7
        + vec3(0.07, 0.1, 0.42) * exp(-h / 0.12) * 0.5;
    sky *= lit * (1.0 - uLight);
    sky += mix(vec3(1.0, 0.5, 0.64), vec3(1.0, 0.64, 0.42), gauss(ds, 0.8 * ws))
        * (exp(-h / 0.075) * 0.45 + exp(-h / 0.03) * 0.3) * uLight;

    // Sunrise: gold at the sun, orange hugging the limb, red trailing along it
    sky += mix(vec3(1.0, 0.8, 0.5), vec3(1.0, 0.8, 0.28), uLight) * exp(-h / 0.05) * gauss(ds, 0.18 * ws) * rise * 0.9;
    sky += vec3(1.0, 0.45, 0.12) * exp(-h / 0.022) * warm * 1.4;
    sky += mix(vec3(1.0, 0.16, 0.1), vec3(1.0, 0.5, 0.1), uLight) * exp(-h / 0.012) * gauss(ds, 0.6 * ws) * rise * 0.8;

    // Airglow: thin green band detached from the limb, faint red layer above
    float ag = gauss(d - 0.055, 0.006) * (0.55 + 0.45 * noise(vec2(s * 6.0 + t * 0.03, 1.0)));
    sky += vec3(0.35, 1.0, 0.45) * ag * 0.3 * (1.0 - 0.7 * warm) * (1.0 - uLight);
    sky += vec3(1.0, 0.3, 0.2) * gauss(d - 0.085, 0.014) * 0.07 * (1.0 - 0.7 * warm) * (1.0 - uLight);

    // Earth: blue ocean, green land and drifting cloud, foreshortened towards the limb
    float depth = max(-d, 0.0);
    float land = smoothstep(0.5, 0.62, fbm(vec2(s * 2.2 + 3.0, sqrt(depth) * 5.0)));
    float clouds = smoothstep(0.4, 0.8, fbm(vec2(s * 3.0 + t * 0.01, sqrt(depth) * 8.0)));
    vec3 earth = mix(vec3(0.08, 0.4, 0.8), vec3(0.16, 0.6, 0.42), land);
    earth = mix(earth, vec3(1.0), clouds * 0.55);

    // On the light page the earth is seen at sunset: dusky slate ocean and muted
    // land, pink cloud tops, a violet cast away from the sun and its glow raking
    // across the surface near it
    vec3 dusk = mix(vec3(0.17, 0.29, 0.54), vec3(0.3, 0.42, 0.36), land);
    dusk = mix(dusk, vec3(1.0, 0.8, 0.74), clouds * 0.6);
    dusk = mix(dusk, vec3(0.46, 0.34, 0.6), 0.45 * (1.0 - lit));
    dusk += vec3(1.0, 0.5, 0.18) * warm * exp(-depth / 0.12) * 0.55;
    dusk = mix(dusk, vec3(1.0, 0.6, 0.6), exp(-depth / 0.03) * 0.55);

    // The atmosphere and first light wrapping over the edge
    vec3 planet = blue * exp(-depth / 0.02) * 0.35 * lit;
    planet += vec3(1.0, 0.5, 0.2) * exp(-depth / 0.035) * warm * 0.5;
    planet += earth * (0.08 * lit + 0.45 * warm) * exp(-depth / 0.1) * (1.0 - uLight);

    float px = 1.5 / unit;
    float above = smoothstep(-px, px, d);
    vec3 e = mix(planet, sky, above);

    // Bloom around the sun, spilling a little over the planet like a lens would
    vec3 bloom = mix(vec3(1.0, 0.95, 0.85), vec3(1.0, 0.9, 0.5), uLight) * exp(-r / 0.012) * 3.0
        + mix(vec3(1.0, 0.7, 0.4), vec3(1.0, 0.72, 0.22), uLight) * exp(-r / 0.07) * 0.9
        + mix(vec3(1.0, 0.45, 0.25), vec3(1.0, 0.6, 0.2), uLight) * exp(-r / mix(0.25, 0.13, uLight)) * 0.25;
    e += bloom * rise * mix(mix(0.35, 0.15, uLight), 1.0, above);

    e = 1.0 - exp(-e * 1.25);

    // Split the light into a hue and a coverage. On the dark page this is plain
    // additive glow, on the light page the same hues are laid down as pigment
    float a = max(e.r, max(e.g, e.b));
    vec3 hue = e / max(a, 1e-4);
    hue = mix(hue, pow(hue, vec3(1.3)), uLight);
    float alpha = mix(a, pow(a, 0.7), uLight);

    // The planet body sits under the glow and melts back into the page with depth:
    // a night side on the dark page, a sunset-lit earth on the light one
    float shade = (1.0 - above) * exp(-depth / 0.22) * mix(0.62, 0.85, uLight);
    vec3 shadeCol = mix(earth * 0.04, min(dusk, 1.0), uLight);

    // Nothing may touch the canvas edges, so the page carries on seamlessly
    float edge = smoothstep(0.0, 0.2, p.y) * smoothstep(1.0, 0.8, uv.y);
    alpha *= edge;
    shade *= edge;

    vec3 rgb = hue * alpha + shadeCol * shade * (1.0 - alpha);
    float outA = alpha + shade * (1.0 - alpha);

    // Film grain, crossfaded between frames so it drifts instead of flickering,
    // and concentrated on the horizon where there is light to carry it
    float gt = t * 9.0;
    float gf = fract(gt);
    vec2 seedA = mod(floor(gt), 64.0) * vec2(37.0, 17.0);
    vec2 seedB = mod(floor(gt) + 1.0, 64.0) * vec2(37.0, 17.0);
    float g = mix(grain(frag, seedA), grain(frag, seedB), gf)
        / sqrt(gf * gf + (1.0 - gf) * (1.0 - gf));
    float amp = (0.16 * gauss(d, 0.1) + 0.2 * sqrt(a)) * edge;
    float gv = clamp(g * amp, -1.0, 1.0);
    float ga = abs(gv);
    rgb = rgb * (1.0 - ga) + vec3(max(gv, 0.0));
    outA = outA + ga * (1.0 - outA);

    gl_FragColor = vec4(rgb, outA);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
    }
    return shader
}

type HorizonBloomProps = {
    className?: string
    children?: React.ReactNode
}

export function HorizonBloom({ className, children }: HorizonBloomProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const gl = canvas.getContext("webgl", { alpha: true, antialias: false })
        const vs = gl && compile(gl, gl.VERTEX_SHADER, VERTEX)
        const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
        const program = gl && vs && fs ? gl.createProgram() : null
        if (!gl || !vs || !fs || !program) {
            setFailed(true)
            return
        }

        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program))
            setFailed(true)
            return
        }
        gl.useProgram(program)

        // One oversized triangle covering the viewport
        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
        const aPos = gl.getAttribLocation(program, "aPos")
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        const uRes = gl.getUniformLocation(program, "uRes")
        const uTime = gl.getUniformLocation(program, "uTime")
        const uDpr = gl.getUniformLocation(program, "uDpr")
        const uLight = gl.getUniformLocation(program, "uLight")

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const start = performance.now()
        let frame = 0
        let visible = true

        // Follow the page theme, easing between the two looks
        const root = document.documentElement
        const isLight = () => (root.classList.contains("dark") ? 0 : 1)
        let light = isLight()

        const draw = () => {
            const time = reducedMotion ? 0 : (performance.now() - start) / 1000
            const target = isLight()
            light = reducedMotion || Math.abs(target - light) < 0.005 ? target : light + (target - light) * 0.12
            gl.uniform1f(uTime, time)
            gl.uniform1f(uLight, light)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }

        const loop = () => {
            draw()
            frame = requestAnimationFrame(loop)
        }

        const play = () => {
            cancelAnimationFrame(frame)
            if (visible && !reducedMotion) frame = requestAnimationFrame(loop)
            else draw()
        }

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr))
            canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr))
            gl.viewport(0, 0, canvas.width, canvas.height)
            gl.uniform2f(uRes, canvas.width, canvas.height)
            gl.uniform1f(uDpr, dpr)
            draw()
        }

        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(canvas)

        // Only animate while on screen
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            play()
        })
        intersectionObserver.observe(canvas)

        const themeObserver = new MutationObserver(() => {
            if (reducedMotion || !visible) draw()
        })
        themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] })

        resize()
        play()

        return () => {
            cancelAnimationFrame(frame)
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
            themeObserver.disconnect()
            gl.deleteBuffer(buffer)
            gl.deleteProgram(program)
            gl.deleteShader(vs)
            gl.deleteShader(fs)
        }
    }, [])

    return (
        <div
            className={cn("pointer-events-none relative w-full overflow-hidden", className)}
            // Static stand-in if WebGL is unavailable
            style={failed ? {
                background:
                    "radial-gradient(60% 45% at 58% 50%, #fbbf7799 0%, #c2410c55 25%, #1e3a8a33 55%, transparent 100%)",
            } : undefined}
        >
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />
            {children && <div className="pointer-events-auto absolute inset-x-0 bottom-0">{children}</div>}
        </div>
    )
}
