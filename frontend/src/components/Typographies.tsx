import React from "react"

// Subheader component for section titles
export const Subheader = ({children}: {children: React.ReactNode}) => {
    return (
        <h2 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          {children}
        </h2>
    );
}

// Consistent typography for experience items (work, volunteer, education)
export const experienceTypography = {
    title: "font-semibold text-sm md:text-base",
    subtitle: "text-sm md:text-base text-muted-foreground",
    date: "text-xs text-muted-foreground whitespace-nowrap",
    description: "text-sm md:text-base text-muted-foreground leading-relaxed",
    subheader: "text-lg font-semibold text-muted-foreground uppercase tracking-wider mb-4"
}
