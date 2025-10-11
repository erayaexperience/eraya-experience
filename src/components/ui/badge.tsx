"use client";

import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

const baseBadgeClass =
  'inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-eraya-beige/10 border border-eraya-beige/10 backdrop-blur-sm';

export function Badge({ children, icon, className }: BadgeProps) {
  return (
    <div className={cn(baseBadgeClass, className)}>
      {icon}
      <span className="text-xs sm:text-sm font-semibold text-eraya-navy">
        {children}
      </span>
    </div>
  );
}

export default Badge;

