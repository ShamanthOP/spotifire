"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import React from "react";
import { twMerge } from "tailwind-merge";

interface SliderProps {
    value?: number;
    className?: string;
    defaultValue?: number;
    max?: number;
    onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
    value = 1,
    className,
    defaultValue = 1,
    max = 1,
    onChange,
}) => {
    const handleChange = (newValue: Array<number>) => {
        onChange?.(newValue[0]);
    };

    return (
        <RadixSlider.Root
            defaultValue={[defaultValue]}
            value={[value]}
            onValueChange={handleChange}
            max={max}
            step={0.1}
            aria-label="Volume"
            className="relative flex items-center select-none touch-none w-full h-10"
        >
            <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
                <RadixSlider.Range
                    className={twMerge(
                        "absolute bg-white rounded-full h-full",
                        className
                    )}
                />
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
};

export default Slider;
