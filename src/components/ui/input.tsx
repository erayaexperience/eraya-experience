import * as React from 'react';

import { cn } from '@/lib/utils';
import { fieldBase, fieldLabel } from './field';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, labelClassName, ...props }, ref) => {
    const inputElement = (
      <input
        type={type}
        className={cn('flex h-12', fieldBase, className)}
        ref={ref}
        title=""
        {...props}
      />
    );

    if (!label) {
      return inputElement;
    }

    return (
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor={props.id} className={cn(fieldLabel, labelClassName)}>
          {label}
        </label>
        {inputElement}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
