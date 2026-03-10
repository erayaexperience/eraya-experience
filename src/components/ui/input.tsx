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
          'flex h-11 w-full rounded-lg border border-[#e5e5e7] bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#162451] focus:outline-none focus:ring-1 focus:ring-[#162451] disabled:cursor-not-allowed disabled:opacity-50',
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
        <label htmlFor={props.id} className={cn("text-[13px] font-semibold leading-none tracking-[0.08em] text-foreground/70 uppercase ml-1 opacity-100", labelClassName)}>
          {label}
        </label>
        {inputElement}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
