'use client';

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface LineProps {
    percentage: number; // 0 = top, 100 = bottom
    className?: string; // extra styles for container
    style?: React.CSSProperties;
    top?: string | number;
    left?: string | number;
}

const Line: React.FC<LineProps> = ({ percentage, className, style, top, left }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    const [containerHeight, setContainerHeight] = useState(0);
    const [dotHeight, setDotHeight] = useState(0);

    useEffect(() => {
        if (!containerRef.current || !dotRef.current) return;

        const containerEl = containerRef.current;
        const dotEl = dotRef.current;

        const updateHeights = () => {
            setContainerHeight(containerEl.offsetHeight);
            setDotHeight(dotEl.offsetHeight);
        };

        updateHeights();

        const resizeObserver = new ResizeObserver(updateHeights);
        resizeObserver.observe(containerEl);
        resizeObserver.observe(dotEl);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const range = Math.max(0, containerHeight - dotHeight);
    const startY = Math.max(0, Math.min(100, percentage));
    const startOffset = (startY / 100) * range;

    return (
        <div
            ref={containerRef}
            className={clsx(
                "w-[2px] h-[600px] bg-[#3B3D48] flex items-center justify-center relative overflow-hidden",
                className
            )}
            style={{
                position: (top !== undefined || left !== undefined) ? "absolute" : "relative",
                top,
                left,
                ...style,
            }}
        >
            <motion.div
                ref={dotRef}
                className="w-4 h-20 rounded-full bg-walrus-mint blur-[1px] absolute"
                initial={{ y: startOffset }}
                animate={{
                    y: [-40, range + 40, -40],
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            />
        </div>
    );
};

export default Line;

