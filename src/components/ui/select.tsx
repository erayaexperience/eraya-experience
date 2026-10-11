"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { fieldBase } from "./field";

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        fieldBase,
        "group flex h-12 cursor-pointer items-center justify-between gap-2 text-left data-placeholder:text-foreground/35 data-[state=open]:border-primary data-[state=open]:bg-white [&>span]:line-clamp-1",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <FiChevronDown className="h-4 w-4 shrink-0 text-foreground/40 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-lenis-prevent
        position={position}
        sideOffset={8}
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-(--r) border border-primary/25 bg-[rgb(255_252_246/0.97)] p-(--p) text-foreground [--p:0.375rem] [--r:1rem] backdrop-blur-xl data-[state=open]:animate-[select-in_160ms_ease-out]",
          position === "popper" && "w-(--radix-select-trigger-width)",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center rounded-[calc(var(--r)-var(--p)-1px)] py-2.5 pr-10 pl-4 text-sm text-foreground/80 outline-none select-none transition-colors data-highlighted:bg-primary/15 data-highlighted:text-secondary data-[state=checked]:font-semibold data-[state=checked]:text-secondary data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute right-3.5 flex h-4 w-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <FiCheck className="h-4 w-4 text-primary" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem };
