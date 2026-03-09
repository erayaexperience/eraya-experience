"use client";

import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export function Badge({ children, icon, className }: BadgeProps) {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#e5e5e7] bg-[#f9f9f9] text-xs font-medium uppercase tracking-wider text-gray-600',
      className
    )}>
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default Badge;
