import React from 'react';
import Image from "next/image";
import { walGrid, walStakedIcon } from "@/app/icons";
import { motion, useMotionValue, useTransform } from "framer-motion";


interface MintedProps {
    onClose: () => void;
}

const Minted: React.FC<MintedProps> = ({ onClose }) => {
        const x = useMotionValue(0);
        const y = useMotionValue(0);
        const rotateX = useTransform(y, [-50, 50], [10, -10]);
        const rotateY = useTransform(x, [-50, 50], [-10, 10]);

        const handleMouseMove = (e: React.MouseEvent) => {
            const rect = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - rect.left - rect.width / 2);
            y.set(e.clientY - rect.top - rect.height / 2);
        };

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
                    <Image src={walGrid} alt="walGrid" width={325} height={328} className="absolute mx-auto aspect-square" />
                    <div className="relative z-30 w-full h-full flex flex-col items-center justify-center">
                        <p className="uppercase font-press-start text-[6px] md:text-[13px] text-mint-300 mb-1 md:mb-3 selection:bg-purple-100/50">
                            OG STAKER
                        </p>
                        <Image
                            src={walStakedIcon}
                            alt="walrus staked Icon"
                            width={123}
                            height={165}
                            className="w-[48px] md:w-[123px]"
                        />
                        <p className="uppercase font-press-start text-[10px] md:text-[20px] text-grape-300 px-4 p-1 text-center mt-1 md:mt-4 selection:bg-blue-100/30">
                            Staked 154 Days
                        </p>
                    </div>
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
