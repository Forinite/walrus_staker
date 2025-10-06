'use client'

import React from 'react'
import Image from "next/image";
import {walrusIcon} from "@/app/icons";
import Minting from "@/app/ui/popUps/Minting";

const MainCard = () => {

    const [checking, setChecking] = React.useState(false)

    const handleChecking = (bool :boolean) => {
        setChecking(bool)
    }
    return (
        <div className={'  h-full flex items-center justify-center pt-[60]'}>

            <div className={'relative  lg:scale-80 md:scale-70 h-fit flex items-center justify-center pt-[60]'}>
                <div className={'absolute md:-top-[146px] -top-[20px] z-10 '}>
                    <Image className={'md:scale-100 scale-80'} width={389} height={258} src={walrusIcon} alt={'walrusIcon'} />
                </div>

                {/*<div className={' md:w-[925px] md:h-[494px] w-[377px] md:max-w-[925px] md:max-h-[494px] h-[577px]  bg-[#3B3D48]/40 backdrop-blur-xs overflow-hidden '}>*/}
                    <div className={'md:w-[100vw] w-[95vw] md:max-w-[925px] md:aspect-[925/494] max-w-[377px] aspect-[377/577] bg-[#3B3D48]/40 backdrop-blur-xs overflow-hidden '}>
                    <div className="absolute -top-12 -right-12 w-[142px] h-[149px] bg-walrus-mint rounded-full blur-xs animate-move-mint" />
                    <div className="absolute -bottom-12 -left-12 w-[142px] h-[149px] bg-walrus-grape rounded-full blur-xs animate-move-grape" />
                    <div className={'  w-full h-full bg-[#3B3D48]/0 backdrop-blur-3xl p-4'} >
                        <div className={'  w-full h-full stroke-on-colored md:pt-0 pt-24'} >
                            <div className={'w-full h-full flex flex-col items-center justify-center'}>

                                <div className={'w-full flex flex-col items-center justify-center  '}>
                                    <div>
                                        <p className={'text-mint-300 font-inter font-extrabold md:text-5xl text-[33px] max-w-[498px] text-center'}>
                                            Have you staked $WAL?
                                        </p>
                                    </div>
                                    <div className={'w-full flex flex-col justify-center items-center'}>
                                        <p className={'font-inter text-center md:text-[20px] text-[14px] py-3'}>
                                            Check your wallet to see how long you have staked $WAL tokens
                                        </p>

                                        {/*I could add a form tag here but nah, it's just going complicate matters while mocking.*/}

                                        <input type={'text'} placeholder={'Input your wallet address here'} className={' md:text-[18px] text-[12px] stroke-on-dark w-[90%] mx-auto md:h-[55px] h-[33px] md:rounded-[12px] rounded-md focus:outline-none px-12 md:text-left text-center'} />

                                    </div>
                                    <div className={'pt-6 pb-4 flex justify-center items-center gap-8'}>
                                        <div
                                            onClick={() => {handleChecking(true)}}
                                            className={'font-inter text-center md:text-base text-[11px] py-2 md:px-12 px-4 bg-[#C482F3] cursor-pointer  rounded-lg'}
                                        >
                                            Check
                                        </div>
                                        {checking &&

                                            <div
                                                className={'font-inter text-center md:text-base text-[11px] hidden md:block py-2 md:px-12 px-8  bg-[#C482F3] cursor-pointer w-fit rounded-lg mx-auto '}>
                                                Claim Loyalty NFT
                                            </div>
                                        }
                                    </div>

                                    {checking &&
                                        <div className={''}>
                                            <p className={'font-inter text-center text-[14px] md:text-[20px] text-mint-300'}>You have been
                                                staking for 154 days
                                            </p>

                                            <div
                                                className={'font-inter text-center md:text-base text-[11px] block md:hidden py-2 md:px-12 px-8  bg-[#C482F3] cursor-pointer w-fit rounded-lg mx-auto my-3'}>
                                                Claim Loyalty NFT
                                            </div>

                                        </div>


                                    }


                                </div>
                                <p className={'text-center inter md:hidden block'}>Stake Walrus</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className={'absolute z-30  w-full flex items-center justify-center'}>
                <Minting />
            </div>

        </div>
    )
}
export default MainCard
