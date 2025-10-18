import React from 'react'
import {walDesktopIcon, walGlobalIcon } from "@/app/icons";
import Image from "next/image";

const Minting = () => {
    return (
        <div className={'border-1 border-[#98F0E4] rounded-[10px] md:w-[540px] w-[260px] aspect-[651/683] stroke-on-colored'}>
            <div className={'md:py-8 py-4'}>
                <p  className={'text-center md:text-[28px] text-lg font-bold'}>Processing</p>
            </div>
            <div className={' relative flex justify-center items-center gap-12 md:mt-20 mt-6'}>
                <div>
                    <Image className={'relative z-10 md:w-[80px] md:h-[80px] aspect-square w-[60px]'} src={walGlobalIcon} alt={'walrusIcon'} width={80} height={80}  />
                </div>
                <div className={'absolute z-0 md:w-[200px] w-[160px] h-1 overflow-hidden'}>
                    <div className={'h-0 w-16 border-2 animate-move-dots border-[#A14AE5] border-dashed'}/>
                </div>
                <div>
                    <Image className={'relative z-10 md:w-[80px] md:h-[80px] aspect-square w-[60px]'} src={walDesktopIcon} alt={'walrusIcon'} width={80} height={80}  />
                </div>
            </div>
            <div className={'mt-8'}>
                <p className={'text-grape-300 md:text-5xl text-[26px] leading-4 font-extrabold text-center font-press-start'}>Minting Your Nft</p>
            </div>
        </div>
    )
}
export default Minting
