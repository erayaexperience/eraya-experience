"use client";

import NumberFlow from "@number-flow/react";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RollingNumberProps {
    value: string;
    className?: string;
}

export function RollingNumber({ value, className }: RollingNumberProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [displayValue, setDisplayValue] = useState(0);

    const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    const suffix = value.replace(/[0-9]/g, "");
    const digitCount = Math.max(String(numericPart).length, 1);
    const suffixClassName = suffix === "%"
        ? "-ml-[0.12em] text-[0.42em] translate-y-[-0.18em]"
        : "-ml-[0.08em] text-[0.58em] translate-y-[-0.1em]";

    useEffect(() => {
        if (!isInView) {
            return;
        }

        let frameId = 0;
        let startTime: number | null = null;
        const duration = 1400;

        const animate = (timestamp: number) => {
            if (startTime === null) {
                startTime = timestamp;
            }

            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const nextValue = Math.round(numericPart * easedProgress);

            setDisplayValue((currentValue) => (
                currentValue === nextValue ? currentValue : nextValue
            ));

            if (progress < 1) {
                frameId = window.requestAnimationFrame(animate);
            }
        };

        setDisplayValue(0);
        frameId = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(frameId);
        };
    }, [isInView, numericPart]);

    return (
        <div ref={ref} className={cn("inline-flex items-baseline gap-0 leading-none font-sans", className)}>
            <span className="inline-flex leading-none">
                <NumberFlow
                    value={displayValue}
                    format={{ useGrouping: false }}
                    locales="en-US"
                    style={{
                        minWidth: `${digitCount}ch`,
                        fontFamily: 'inherit',
                        fontVariantNumeric: 'tabular-nums',
                    }}
                />
            </span>
            {suffix && (
                <span
                    className={cn(
                        "inline-block text-primary/80 font-bold leading-none transform-gpu",
                        suffixClassName
                    )}
                >
                    {suffix}
                </span>
            )}
        </div>
    );
}
