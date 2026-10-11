import * as React from 'react';

import { cn } from '@/lib/utils';
import { fieldBase } from './field';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn('flex min-h-32 resize-none py-4', fieldBase, 'leading-relaxed', className)}
        ref={ref}
        title=""
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
