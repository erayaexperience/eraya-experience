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
    'font-semibold leading-[1.04] tracking-[-0.04em] text-foreground';

const sizeByAs: Record<NonNullable<HeadingProps['as']>, string> = {
    h1: 'text-[2.75rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem] xl:text-[4.75rem]',
    h2: 'text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem]',
    h3: 'text-[1.75rem] sm:text-[2rem] md:text-[2.5rem]',
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
                            {before && <span className="text-secondary">{before}</span>}
                            {gradient && (
                                <span className="font-semibold bg-gradient-to-r from-primary via-secondary/70 to-secondary bg-clip-text text-transparent">
                                    {gradient}
                                </span>
                            )}
                            {after && <span className="text-foreground">{after}</span>}
                        </>
                    ) : highlight ? (
                        <span className="font-semibold bg-gradient-to-r from-primary via-secondary/70 to-secondary bg-clip-text text-transparent">
                            {children}
                        </span>
                    ) : (
                        children
                    )}
                </Tag>
                {subtitle && (
                    <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl md:max-w-3xl mx-auto font-normal mt-4">
                        {subtitle}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
}

export default Heading;
