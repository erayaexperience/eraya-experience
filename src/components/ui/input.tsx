import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, labelClassName, ...props }, ref) => {
    const inputElement = (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-2xl border border-border bg-background/30 px-6 text-base text-foreground placeholder-foreground/30 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );

    if (!label) {
      return inputElement;
    }

    return (
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor={props.id} className={cn("text-[10px] font-bold uppercase tracking-widest text-secondary/60 ml-1", labelClassName)}>
          {label}
        </label>
        {inputElement}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
