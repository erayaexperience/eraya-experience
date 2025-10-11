"use client";

import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

const baseBadgeClass =
  'inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/80 border border-white/60 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)]';

export function Badge({ children, icon, className }: BadgeProps) {
  return (
    <div className={cn(baseBadgeClass, className)}>
      {icon}
      <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
        {children}
      </span>
    </div>
  );
}

export default Badge;
