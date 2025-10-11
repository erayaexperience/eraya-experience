import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[26px] text-[15px] font-semibold tracking-tight ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_12px_28px_rgba(214,182,133,0.32)] hover:bg-primary/90 hover:shadow-[0_18px_36px_rgba(214,182,133,0.35)]',
        destructive:
          'bg-destructive text-destructive-foreground shadow-[0_10px_24px_rgba(255,69,58,0.28)] hover:bg-destructive/90',
        outline:
          'border border-[rgba(209,209,214,0.8)] bg-white text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:bg-white/90',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[0_6px_16px_rgba(22,36,81,0.32)] hover:bg-secondary/90 hover:shadow-[0_10px_24px_rgba(22,36,81,0.35)]',
        subtle:
          'bg-[rgba(255,255,255,0.65)] text-foreground border border-[rgba(255,255,255,0.6)] backdrop-blur-2xl hover:bg-[rgba(255,255,255,0.8)] hover:border-[rgba(255,255,255,0.8)] shadow-[0_10px_28px_rgba(0,0,0,0.08)]',
        ghost:
          'text-foreground hover:bg-[rgba(0,0,0,0.05)] hover:text-foreground/80',
        link: 'text-secondary underline-offset-4 hover:underline decoration-2',
      },
      size: {
        default: 'h-12 px-6',
        sm: 'h-10 rounded-[24px] px-5 text-[14px]',
        lg: 'h-14 rounded-[30px] px-10 text-base',
        icon: 'h-12 w-12 rounded-[24px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
