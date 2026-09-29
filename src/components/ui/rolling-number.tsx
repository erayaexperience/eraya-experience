"use client";

import NumberFlow, { continuous } from "@number-flow/react";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RollingNumberProps {
    value: string;
    className?: string;
}

export function RollingNumber({ value, className }: RollingNumberProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });
    const [animated, setAnimated] = useState(false);

    const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    const suffix = value.replace(/[0-9]/g, "");

    useEffect(() => {
        if (isInView && !animated) {
            setAnimated(true);
        }
    }, [isInView, animated]);

    return (
        <div ref={ref} className={cn("inline-flex items-baseline leading-none font-sans", className)}>
            <NumberFlow
                value={animated ? numericPart : 0}
                suffix={suffix}
                plugins={[continuous]}
                trend={1}
                transformTiming={{
                    duration: 1100,
                    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                data-suffix={suffix}
                className="font-inherit leading-none"
            />
        </div>
    );
}
