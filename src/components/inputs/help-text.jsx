import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

const helpTextVariants = cva("text-[12px] leading-[16px]", {
  variants: {
    variant: {
      default: "text-neutral-6",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const HelpText = ({ error, dataRef, className, children }) => {
  return (
    <span
      className={cn(
        helpTextVariants({ variant: error ? "destructive" : "default" }),
        className
      )}
       style={{ whiteSpace: "pre-line" }}
    >
      {children}
    </span>
  );
};
