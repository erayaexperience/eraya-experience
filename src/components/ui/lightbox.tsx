"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export type LightboxItem = {
    src: string;
    alt: string;
    width: number;
    height: number;
    title: string;
    caption?: string;
};

interface LightboxProps {
    items: LightboxItem[];
    index: number | null;
    onIndexChange: (index: number | null) => void;
    label: string;
}

export function Lightbox({ items, index, onIndexChange, label }: LightboxProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const item = index === null ? null : items[index];
    const hasMany = items.length > 1;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (index !== null && !dialog.open) dialog.showModal();
        if (index === null && dialog.open) dialog.close();
    }, [index]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        dialog.setAttribute("closedby", "any");
        if ("closedBy" in HTMLDialogElement.prototype) return;

        const handleClick = (event: MouseEvent) => {
            if (event.target !== dialog) return;
            const rect = dialog.getBoundingClientRect();
            const inside =
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width;
            if (!inside) dialog.close();
        };
        dialog.addEventListener("click", handleClick);
        return () => dialog.removeEventListener("click", handleClick);
    }, []);

    const step = (delta: number) => {
        if (index === null) return;
        onIndexChange((index + delta + items.length) % items.length);
    };

    return (
        <dialog
            ref={dialogRef}
            aria-label={item ? `${label}: ${item.title}` : label}
            onClose={() => onIndexChange(null)}
            onKeyDown={(event) => {
                if (!hasMany) return;
                if (event.key === "ArrowRight") step(1);
                if (event.key === "ArrowLeft") step(-1);
            }}
            className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
        >
            {item && (
                <figure className="flex flex-col items-center">
                    <Image
                        key={item.src}
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        sizes="92vw"
                        className="h-auto max-h-[80dvh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-2xl md:max-w-[80vw]"
                    />
                    <figcaption className="mt-4 max-w-[92vw] text-center text-white">
                        <p className="text-base font-medium tracking-tight">{item.title}</p>
                        {item.caption && (
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">{item.caption}</p>
                        )}
                        {hasMany && (
                            <p className="mt-2 text-xs text-white/50">
                                {index! + 1} / {items.length}
                            </p>
                        )}
                    </figcaption>
                </figure>
            )}

            <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close"
                className="fixed top-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full glass-gold text-white transition-[filter] hover:brightness-125"
            >
                <FiX className="h-5 w-5" />
            </button>

            {hasMany && (
                <>
                    <button
                        type="button"
                        onClick={() => step(-1)}
                        aria-label="Previous"
                        className="fixed top-1/2 left-2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full glass-gold text-white transition-[filter] hover:brightness-125 md:left-6"
                    >
                        <FiChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => step(1)}
                        aria-label="Next"
                        className="fixed top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full glass-gold text-white transition-[filter] hover:brightness-125 md:right-6"
                    >
                        <FiChevronRight className="h-5 w-5" />
                    </button>
                </>
            )}
        </dialog>
    );
}
