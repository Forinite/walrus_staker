'use client'
import React from 'react'
import Line from "@/app/ui/Line";

const Lines = () => {
    // Array of 14 lines with rotation/scale + percentage
    const configs = [
        { rot: "rotate-[55deg]", percentage: 5 },
        { rot: "rotate-[47deg]", percentage: 15 },
        { rot: "rotate-[40deg]", percentage: 25 },
        { rot: "rotate-[32deg]", percentage: 35 },
        { rot: "rotate-[24deg]", percentage: 45 },
        { rot: "rotate-[17deg]", percentage: 55 },
        { rot: "rotate-[9deg]", percentage: 65 },
        { rot: "rotate-[1deg]", percentage: 75 },
        { rot: "rotate-[-7deg]", percentage: 85 },
        { rot: "rotate-[-14deg]", percentage: 25 },
        { rot: "rotate-[-22deg]", percentage: 50 },
        { rot: "rotate-[-30deg]", percentage: 70 },
        { rot: "rotate-[-37deg]", percentage: 90 },
        { rot: "rotate-[-45deg]", percentage: 40 },
    ];


    return (
        <div className="fixed -bottom-60  w-screen flex justify-between items-center">

            <div className={'absolute z-20 left-0 top-0 w-screen h-40 blur-sm stroke-on-colored '} />
            <div className={'absolute -z-10  bottom-[425px] w-full flex flex-col items-center justify-center'}>
                <div className={'w-[100px] h-[300px] stroke-on-colored rotate-[55deg] absolute left-2 -top-28 blur-[5px] z-40 '} />
                <div className={'w-[90%] h-[2px] bg-[#3B3D48] rotate-y-[-10deg] rounded-y-[4px]  relative '} />
                <div className={'w-[90%] h-[2px] bg-[#3B3D48] rotate-y-[-10deg] rounded-y-[4px]  relative top-10 '} />
                <div className={'w-[100%] h-[2px] bg-[#3B3D48] rotate-y-[-10deg] rounded-y-[4px]  relative top-20 '} />
                <div className={'w-[100%] h-[2px] bg-[#3B3D48] rotate-y-[-10deg] rounded-y-[4px]  relative top-34 '} />
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


