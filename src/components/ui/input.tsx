import * as React from 'react';

import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-[26px] border border-[rgba(209,209,214,0.8)] bg-white/90 px-5 text-[15px] leading-tight ring-offset-background shadow-[0_12px_26px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out file:border-0 file:bg-transparent file:text-[15px] file:font-medium file:text-foreground placeholder:text-foreground/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
