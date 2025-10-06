import React from 'react'
import {walDesktopIcon, walGlobalIcon, walIcon} from "@/app/icons";
import Image from "next/image";

const Minting = () => {
    return (
        <div className={'border-1 border-[#98F0E4] rounded-[10px] md:w-[540px] max-w-[300px] w-[90%] aspect-[651/683] stroke-on-colored'}>
            <div className={'md:py-8 py-4'}>
                <p  className={'text-center md:text-base text-lg font-bold'}>Processing</p>
            </div>
            <div className={'flex justify-center items-center gap-12 md:mt-20 mt-6'}>
                <div>
                    <Image className={'md:w-[80px] md:h-[80px] aspect-square w-[60px]'} src={walGlobalIcon} alt={'walrusIcon'} width={80} height={80}  />
                </div>
                <div>
                    <Image className={'md:w-[80px] md:h-[80px] aspect-square w-[60px]'} src={walDesktopIcon} alt={'walrusIcon'} width={80} height={80}  />
                </div>
            </div>
            <div className={'mt-8'}>
                <p className={'text-grape-300 md:text-5xl text-[26px] leading-4 font-extrabold text-center font-press-start'}>Minting Your Nft</p>
            </div>
        </div>
    )
}
export default Minting
