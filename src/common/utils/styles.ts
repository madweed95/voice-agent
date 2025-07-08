import { cva } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-xxs"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Config = {
  variants: Record<string, ClassValue>;
  defaultVariants?: Record<string, ClassValue>;
  compoundVariants?: Record<string, ClassValue>[];
};
export const cvaProps = (className: string, config: Config) => {
  const keyValueVariants: Record<string, string[]> = {};

  for (const variant in config!.variants) {
    if (Object.hasOwn(config!.variants, variant)) {
      keyValueVariants[variant] = Object.keys(config!.variants[variant] || {});
    }
  }

  return (variants: Record<string, string | undefined | boolean>) => {
    for (const variant in variants) {
      if (
        !keyValueVariants[variant] ||
        !keyValueVariants[variant].includes(variants[variant]?.toString() || "")
      ) {
        delete variants[variant];
      }
    }

    return cva(className, config as unknown as undefined)(variants);
  };
};
