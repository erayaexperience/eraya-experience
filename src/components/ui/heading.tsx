"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type HeadingProps = {
    as?: 'h1' | 'h2' | 'h3';
    children?: React.ReactNode;
    className?: string;
    highlight?: boolean;
    center?: boolean;
    subtitle?: string;
    before?: string;
    gradient?: string;
    after?: string;
};

const baseClass =
    'font-extralight leading-none tracking-tighter text-eraya-navy';

const sizeByAs: Record<NonNullable<HeadingProps['as']>, string> = {
    h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
    h2: 'text-4xl md:text-6xl lg:text-7xl',
    h3: 'text-3xl md:text-4xl',
};

export function Heading({
    as = 'h2',
    children,
    className,
    highlight = false,
    center = true,
    subtitle,
    before,
    gradient,
    after,
}: HeadingProps) {
    const Tag = as;

    return (
        <motion.div className={cn(center && 'text-center', 'mb-4 sm:mb-6')}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Tag className={cn(baseClass, sizeByAs[as], className)}>
                    {typeof before === 'string' || typeof gradient === 'string' || typeof after === 'string' ? (
                        <>
                            {before && <span className="text-eraya-navy">{before}</span>}
                            {gradient && (
                                <span className="font-semibold bg-gradient-to-r from-eraya-navy via-eraya-beige to-eraya-navy bg-clip-text text-transparent">
                                    {gradient}
                                </span>
                            )}
                            {after && <span className="text-eraya-navy">{after}</span>}
                        </>
                    ) : highlight ? (
                        <span className="font-semibold bg-gradient-to-r from-eraya-navy via-eraya-beige to-eraya-navy bg-clip-text text-transparent">
                            {children}
                        </span>
                    ) : (
                        children
                    )}
                </Tag>
                {subtitle && (
                    <p className="text-base md:text-xl text-eraya-navy/60 max-w-2xl md:max-w-3xl mx-auto font-light mt-3 md:mt-4">
                        {subtitle}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
}

export default Heading;


