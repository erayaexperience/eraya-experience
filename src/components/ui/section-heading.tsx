import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    subtitle?: string;
    title: ReactNode;
    description?: ReactNode;
    layout?: "center" | "compact";
    className?: string;
}

const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 },
} as const;

const Eyebrow = ({ children, className }: { children: string; className: string }) => (
    <div className={cn("inline-flex items-center gap-3", className)}>
        <span className="w-8 h-px bg-primary" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">{children}</span>
        <span className="w-8 h-px bg-primary" />
    </div>
);

const Description = ({ children, className }: { children: ReactNode; className?: string }) => (
    <p className={cn("mt-6 text-lg text-foreground/75 leading-relaxed", className)}>{children}</p>
);

export function SectionHeading({
    subtitle,
    title,
    description,
    layout = "center",
    className,
}: SectionHeadingProps) {
    if (layout === "center") {
        return (
            <div className={cn("text-center mb-12 md:mb-16", className)}>
                <motion.div {...reveal}>
                    {subtitle && <Eyebrow className="justify-center mb-6">{subtitle}</Eyebrow>}
                    <h2 className="text-4xl font-semibold text-secondary sm:text-5xl lg:text-[56px] leading-[1.1] tracking-tight">
                        {title}
                    </h2>
                    {description && <Description className="mx-auto max-w-2xl">{description}</Description>}
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div className={cn("mb-12", className)} {...reveal}>
            {subtitle && <Eyebrow className="mb-4">{subtitle}</Eyebrow>}
            <h2 className="text-3xl sm:text-4xl font-semibold text-secondary leading-tight tracking-tight">
                {title}
            </h2>
            {description && <Description>{description}</Description>}
        </motion.div>
    );
}
