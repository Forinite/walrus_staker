'use client'
import React from 'react'
import Line from "@/app/ui/Line";

const Lines = () => {
    // Array of 14 lines with rotation/scale + percentage
    const configs = [
        { rot: "rotate-[55deg]", percentage: 5 },
        { rot: "rotate-[47deg]", percentage: 8 },
        { rot: "rotate-[40deg]", percentage: 11 },
        { rot: "rotate-[32deg]", percentage: 14 },
        { rot: "rotate-[24deg]", percentage: 17 },
        { rot: "rotate-[17deg]", percentage: 20 },
        { rot: "rotate-[9deg]", percentage: 23 },
        { rot: "rotate-[1deg]", percentage: 26 },
        { rot: "rotate-[-7deg]", percentage: 46 },
        { rot: "rotate-[-14deg]", percentage: 80 },
        { rot: "rotate-[-22deg]", percentage: 77 },
        { rot: "rotate-[-30deg]", percentage: 74 },
        { rot: "rotate-[-37deg]", percentage: 70 },
        { rot: "rotate-[-45deg]", percentage: 71 },
    ];


    return (
        <div className="fixed -bottom-60  w-screen flex justify-between items-center">

            <div className={'absolute z-20 left-0 top-0 w-screen h-40 blur-sm stroke-on-colored '} />
            <div className={'absolute -z-10  bottom-[425px] w-full flex flex-col items-center justify-center'}>
                <div className={'w-[100px] h-[300px] stroke-on-colored rotate-[55deg] absolute left-2 -top-28 blur-[5px] z-40 '} />
                <div className={'w-[90%] h-[2px] bg-[#3B3D48] rotate-y-[-10deg] rounded-y-[4px]  relative '} />
                <div className={'w-[90%] h-[2px] bg-[#3B3D48] rotate-y-[-10deg] rounded-y-[4px]  relative top-8 '} />
                <div className={'w-[100%] h-[2px] bg-[#3B3D48] rotate-y-[-10deg] rounded-y-[4px]  relative top-18 '} />
                <div className={'w-[100%] h-[2px] bg-[#3B3D48] rotate-y-[-10deg] rounded-y-[4px]  relative top-30 '} />
                <div className={'w-[100%] h-[2px] bg-[#3B3D48] rotate-y-[-10deg] rounded-y-[4px]  relative top-46 '} />
                <div className={'w-[100px] h-[300px] stroke-on-colored rotate-[-45deg] absolute -right-12 -top-20  blur-[5px] z-40 '} />

            </div>
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


