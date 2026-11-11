import './App.css'
import 'lenis/dist/lenis.css'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Writing from '@/pages/Writing'

function App() {
  // Eased wheel scrolling across the site; touch scrolling stays native
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // A high lerp keeps it light: the page follows the wheel closely and only the stops are softened
    const lenis = new Lenis({ autoRaf: true, lerp: 0.22 })
    return () => lenis.destroy()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writing/:slug" element={<Writing />} />
      </Routes>
    </Router>
  )
}

export default App
