import React from 'react';
import Image, { StaticImageData } from 'next/image';
import OgStaker from '../../../public/images/OgStaker.jpg';
import WalFan from '../../../public/images/WalFan.jpg';
import WalStaker from '../../../public/images/WalStaker.jpg';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface MintedProps {
  onClose: () => void;
  stakeDays: number;
}

const Minted: React.FC<MintedProps> = ({ onClose, stakeDays }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const NftType = stakeDays >= 90
      ? { image: OgStaker, rank: 'OG' }
      : stakeDays >= 30
      ? { image: WalFan, rank: 'Walrus Fan' }
      : { image: WalStaker, rank: 'Walrus Staker' };

  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <div className="border-1 border-[#98F0E4]/40 rounded-[10px] md:rounded-[18px] md:w-[540px] w-[260px] aspect-[651/683] stroke-on-colored bg-[#3B3D48]/60 backdrop-blur-md">
      <div className="md:pt-8 pt-4">
        <p className="text-center md:text-[28px] text-[14px] font-bold selection:bg-purple-400/30">
          Transaction Successful
        </p>
      </div>

      <div className="flex justify-center w-full items-center gap-12 md:mt-6 mt-3">
        <div className="w-[50%] md:w-[305px] aspect-[325/328] border border-[#98F0E4] overflow-hidden rounded-[4px] relative">
          <Image
            src={NftType.image}
            alt={NftType.rank}
            width={325}
            height={328}
            className=" mx-auto aspect-square"
          />
        </div>
      </div>

      <div className="mt-4 md:mt-8">
        <p className="text-mint-300 md:text-5xl text-[26px] leading-4 font-extrabold text-center font-press-start selection:bg-purple-100/50">
          Minted
        </p>
      </div>

      <div className="my-4">
        <motion.div
          style={{
            x,
            y,
            rotateX,
            rotateY,
            perspective: 600,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={reset}
          onClick={onClose}
          className="bg-walrus-grape md:px-6 px-4 py-2 mx-auto rounded-lg w-fit cursor-pointer font-inter font-light md:text-base text-[11px] hover:shadow-[0_0_15px_rgba(196,130,243,0.3)] transition-transform duration-150"
          whileTap={{ scale: 0.95 }}
        >
          Check Wallet
        </motion.div>
      </div>
    </div>
  );
};

export default Minted;
