'use client'
import React from 'react'
import Line from "@/app/ui/Line";

const Lines = () => {
    // Array of 14 lines with rotation/scale + percentage
    const configs = [
        { rot: "-rotate-[-35deg]", percentage: 5 },
        { rot: "-rotate-[-30deg]", percentage: 15 },
        { rot: "-rotate-[-25deg]", percentage: 25 },
        { rot: "-rotate-[-20deg]", percentage: 35 },
        { rot: "-rotate-[-15deg]", percentage: 45 },
        { rot: "-rotate-[-10deg]", percentage: 55 },
        { rot: "-rotate-[-5deg] ", percentage: 65 },
        { rot: "rotate-0 scale-", percentage: 75 }, // center, tallest
        { rot: "rotate-[-5deg] ", percentage: 85 },
        { rot: "rotate-[-10deg]", percentage: 25 },
        { rot: "rotate-[-15deg]", percentage: 50 },
        { rot: "rotate-[-20deg]", percentage: 70 },
        { rot: "rotate-[-25deg]", percentage: 90 },
        { rot: "rotate-[-30deg]", percentage: 40 },
    ];

    return (
        <div className="absolute bottom-40 left-0 w-full flex justify-between items-end">
            {configs.map((cfg, i) => (
                <Line
                    key={i}
                    percentage={cfg.percentage}
                    className={`relative ${cfg.rot}`}
                />
            ))}
        </div>
    )
}

export default Lines


