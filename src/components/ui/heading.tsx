import { cn } from '@/lib/utils';

type HeadingProps = {
    as?: 'h1' | 'h2' | 'h3';
    children?: React.ReactNode;
    className?: string;
    center?: boolean;
    subtitle?: string;
};

const sizeByAs: Record<NonNullable<HeadingProps['as']>, string> = {
    h1: 'text-4xl sm:text-5xl lg:text-6xl',
    h2: 'text-3xl sm:text-4xl lg:text-5xl',
    h3: 'text-2xl sm:text-3xl',
};

export function Heading({
    as = 'h2',
    children,
    className,
    center = true,
    subtitle,
}: HeadingProps) {
    const Tag = as;

    return (
        <div className={cn(center && 'text-center', 'mb-6')}>
            <Tag className={cn(
                'font-semibold leading-tight tracking-tight text-gray-900',
                sizeByAs[as],
                className
            )}>
                {children}
            </Tag>
            {subtitle && (
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default Heading;
