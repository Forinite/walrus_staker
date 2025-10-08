import React from 'react'
import {walDesktopIcon, walGlobalIcon, walIcon} from "@/app/icons";
import Image from "next/image";
import ImageGird from "@/app/ui/Subcomponents/ImageGird";

const Minted = () => {
    return (
        <div className={'border-1 border-[#98F0E4]/40 rounded-[10px] md:w-[540px] max-w-[300px] w-[90%] aspect-[651/683] stroke-on-colored'}>
            <div className={'md:py-8 py-4'}>
                <p  className={'text-center md:text-base text-lg font-bold'}>Transaction Successful</p>
            </div>
            <div className={'flex justify-center w-full items-center gap-12 md:mt-12 mt-6'}>
                <div className={' w-[50%] aspect-[325/328] border border-[#98F0E4] rounded-[10px]'}>
                    {/*<Image className={'md:w-[80px] md:h-[80px] mx-auto aspect-square w-[60px]'} src={walGlobalIcon} alt={'walrusIcon'} width={80} height={80}  />*/}

                    <div className={' relative flex justify-between h-full  overflow-hidden'}>
                        <ImageGird  inverted={false}/>
                        <div className={'flex flex-col items-center'}>
                            <div className={'absolute z-20 w-[140%] aspect-[5/3] md:-left-8 -left-4 md:-bottom-30 -bottom-12 stroke-on-colored rounded-[190px] blur-[10px]'} />
                            <div className={'absolute z-20 w-[50%] aspect-[2/5] md:-top-30 -bottom-12 stroke-on-colored rounded-[190px] blur-[10px]'} />
                        </div>

                        <ImageGird inverted={true} />

                     </div>
                </div>
            </div>
            <div className={'mt-8'}>
                <p className={'text-mint-300 md:text-5xl text-[26px] leading-4 font-extrabold text-center font-press-start'}>Minted</p>
            </div>
        </div>
    )
}
export default Minted
