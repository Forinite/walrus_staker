'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { walIcon } from '@/app/icons';
import { ConnectButton } from '@mysten/dapp-kit';

const Header = () => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className={
        ' absolute w-screen h-[54px]  px-4 border-b-[1px] border-0 border-white  text-white z-50 '
      }
    >
      <div className={'w-full h-full flex items-center justify-between '}>
        <div className=" absolute  w-fit flex flex-col items-center justify-center scale-90 ">
          <Image
            className="absolute md:h-[40px] md:w-[46px] h-[26px] w-[30px]"
            src={walIcon}
            alt={'walrusIcon'}
            height={40}
            width={46}
          />
          <p className="relative z-10 md:text-base text-[10px] font-press-start text-white-100 pt-4">
            Walru<span className="text-grape-300">s S</span>taker
          </p>
        </div>
        <div />
        <div className={'md:block hidden'}>
          <p className={'font-inter font-light scale-90 md:text-base text-sm'}>
            <a href="https://stake-wal.wal.app" target="_blank">
              Stake Walrus
            </a>
          </p>
        </div>
        <div />
        <div className={'absolute right-4'}>
          <ConnectButton
            connectText="Connect Wallet"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 200,
              padding: '8px 32px',
              backgroundColor: isHovering ? '#B36EE5' : '#C482F3', // slightly darker on hover
              borderRadius: '8px',
              transform: 'scale(.9)',
              width: 'fit-content',
              color: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />

          {/* <ConnectButton className="font-inter font-extralight px-4 py-2 bg-[#C482F3] rounded-lg w-fit scale-90">Connect Wallect</ConnectButton> */}
          {/* <div className="font-inter font-extralight px-4 py-2 bg-[#C482F3] rounded-lg w-fit scale-90">Connect wallet</div> */}
        </div>
      </div>
    </div>
  );
};
export default Header;
