'use client'

import React from 'react'
import Image from "next/image";
import {walrusIcon} from "@/app/icons";

const MainCard = () => {

    const [checking, setChecking] = React.useState(false)

    const handleChecking = (bool :boolean) => {
        setChecking(bool)
    }
    return (
        <div className={'  h-full flex items-center justify-center pt-[60]'}>

            <div className={'relative  scale-80 h-fit flex items-center justify-center pt-[60]'}>
                <div className={'absolute -top-[146px] z-10 '}>
                    <Image width={389} height={258} src={walrusIcon} alt={'walrusIcon'} />
                </div>

                <div className={' w-[925px] h-[494px] bg-[#3B3D48]/40 backdrop-blur-xl overflow-hidden'}>
                    <div className={' absolute -top-12 -right-12 w-[142px] h-[149px] bg-walrus-mint rounded-full blur-xs'} />
                    <div className={' absolute -bottom-12 -left-12 w-[142px] h-[149px] bg-walrus-grape rounded-full blur-xs'} />
                    <div className={'  w-full h-full bg-[#3B3D48]/10 backdrop-blur-3xl p-4'} >
                        <div className={'  w-full h-full stroke-on-colored'} >
                            <div className={'w-full h-full flex flex-col items-center justify-center'}>

                                <div className={'w-full flex flex-col items-center justify-center  '}>
                                    <div>
                                        <p className={'text-mint-300 font-inter font-extrabold text-5xl max-w-[498px] text-center'}>
                                            Have you staked $WAL?
                                        </p>
                                    </div>
                                    <div className={'w-full flex flex-col justify-center items-center'}>
                                        <p className={'font-inter text-center text-[20px] py-3'}>
                                            Check your wallet to see how long you have staked $WAL tokens
                                        </p>

                                        {/*I could add a form tag here but nah, it's just going complicate matters while mocking.*/}

                                        <input type={'text'} placeholder={'Input your wallet address here'} className={' text-[18px] stroke-on-dark w-[90%] mx-auto h-[55px] rounded-[12px] focus:outline-none px-12'} />

                                    </div>
                                    <div className={'py-6 flex justify-center items-center gap-8'}>
                                        <div
                                            onClick={() => {handleChecking(true)}}
                                            className={'font-inter text-center text-base py-2 px-12 bg-[#C482F3] cursor-pointer  rounded-lg'}
                                        >
                                            Check
                                        </div>
                                        {checking &&

                                            <div
                                                className={'font-inter text-center text-base py-2 px-12 bg-[#C482F3] cursor-pointer w-fit rounded-lg mx-auto'}>
                                                Claim Loyalty NFT
                                            </div>
                                        }
                                    </div>

                                    {checking &&
                                        <div className={''}>
                                            <p className={'font-inter text-center text-[20px] text-mint-300'}>You have been
                                                staking for 154 days</p>

                                        </div>
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default MainCard
