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
                    <span className="w-8 h-px bg-primary" />
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
