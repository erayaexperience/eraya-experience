import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    subtitle?: string;
    title: ReactNode;
    description?: ReactNode;
    layout?: "center" | "split" | "stacked" | "compact";
    className?: string;
}

export function SectionHeading({
    subtitle,
    title,
    description,
    layout = "split",
    className,
}: SectionHeadingProps) {
    if (layout === "center") {
        return (
            <div className={cn("text-center mb-16 lg:mb-24", className)}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    {subtitle && (
                        <div className="inline-flex items-center justify-center gap-3 mb-6">
                            <span className="w-8 h-px bg-primary" />
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                                {subtitle}
                            </span>
                            <span className="w-8 h-px bg-primary" />
                        </div>
                    )}
                    <h2 className="text-4xl font-semibold text-secondary sm:text-5xl lg:text-[56px] leading-[1.1] tracking-tight">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-6 mx-auto max-w-2xl text-lg text-foreground/70 font-light leading-relaxed">
                            {description}
                        </p>
                    )}
                </motion.div>
            </div>
        );
    }

    if (layout === "stacked") {
        return (
            <div className={cn("mb-12", className)}>
                {subtitle && (
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-12 h-px bg-primary" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                            {subtitle}
                        </span>
                        <span className="w-12 h-px bg-primary" />
                    </div>
                )}
                <h2 className="text-4xl font-semibold text-secondary sm:text-5xl lg:text-[56px] leading-[1.1] tracking-tight">
                    {title}
                </h2>
                {description && (
                    <p className="mt-6 text-lg text-foreground/70 font-light leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        );
    }

    if (layout === "compact") {
        return (
            <motion.div
                className={cn("mb-12", className)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                {subtitle && (
                    <div className="inline-flex items-center gap-3 mb-4">
                        <span className="w-8 h-px bg-primary" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                            {subtitle}
                        </span>
                    </div>
                )}
                <h2 className="text-3xl sm:text-4xl font-semibold text-secondary leading-tight tracking-tight">
                    {title}
                </h2>
                {description && (
                    <p className="mt-6 text-lg text-foreground/70 font-light leading-relaxed">
                        {description}
                    </p>
                )}
            </motion.div>
        );
    }

    // layout === "split" (Default)
    return (
        <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 lg:mb-28", className)}>
            <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                {subtitle && (
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-12 h-px bg-primary" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                            {subtitle}
                        </span>
                        <span className="w-12 h-px bg-primary" />
                    </div>
                )}
                <h2 className="text-4xl font-semibold text-secondary sm:text-5xl lg:text-[56px] leading-[1.1] tracking-tight">
                    {title}
                </h2>
            </motion.div>
            {description && (
                <motion.div
                    className="max-w-sm"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p className="text-lg text-foreground/70 font-light leading-relaxed">
                        {description}
                    </p>
                </motion.div>
            )}
        </div>
    );
}
