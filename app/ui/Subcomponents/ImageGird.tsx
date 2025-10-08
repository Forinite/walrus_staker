import React from 'react'

const ImageGird: React.FC<{ inverted :boolean}>  = ({inverted}) => {
    return (
        <div className={`relative flex w-fit h-full overflow-hidden ${inverted? 'rotate-y-180 ': ''} `}>
            <div className={'absolute h-full flex flex-col w-full overflow-hidden '}  >

                <div className={`absolute md:top-[-64px] top-[-16x] -left-8 rotate-[47deg] h-0.5 w-60 bg-walrus-mint `} />
                <div className={`absolute md:top-[-16px] top-[-5px] -left-8 rotate-[37deg] h-0.5 w-60 bg-walrus-mint `} />
                <div className={`absolute md:top-[16px]  top-[5px] -left-8 rotate-[27deg] h-0.5 w-60 bg-walrus-mint `} />
                <div className={`absolute md:top-[64px]  top-[21px] -left-8 rotate-[17deg] h-0.5 w-60 bg-walrus-mint `} />
                <div className={`absolute md:top-[110px] top-[34px] -left-8 rotate-[10deg] h-0.5 w-60 bg-walrus-mint `} />
                <div className={`absolute md:top-[158px] top-[50px] -left-8 rotate-[3deg] h-0.5 w-60 bg-walrus-mint `} />
                <div className={`absolute md:top-[206px] top-[66px] -left-8 rotate-[0deg] h-0.5 w-60 bg-walrus-mint `} />
                <div className={`absolute md:top-[254px] top-[82px] -left-8 rotate-[-3deg] h-0.5 w-60 bg-walrus-mint `} />
                <div className={`absolute md:top-[302px] top-[98px] -left-8 rotate-[-7deg] h-0.5 w-60 bg-walrus-mint `} />
                <div className={`absolute md:top-[350px] top-[114px] -left-8 rotate-[-17deg] h-0.5 w-60 bg-walrus-mint `} />



            </div>
            <div className={'h-full w-0.5 bg-walrus-mint md:ml-[16px] ml-2'} />
            <div className={'h-full w-0.5 bg-walrus-mint md:ml-[24px] ml-[12px]'} />
            <div className={'h-full w-0.5 bg-walrus-mint md:ml-[16px] ml-[8px]'} />
            <div className={'h-full w-0.5 bg-walrus-mint md:ml-[12px] ml-[6px]'} />
            <div className={'h-full w-0.5 bg-walrus-mint md:ml-[8px] ml-[4px]'} />
            <div className={'h-full w-0 bg-walrus-mint md:ml-[6px] ml-[2px]'} />

        </div>
    )
}
export default ImageGird
