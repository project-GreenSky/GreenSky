import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const getPerc = (val = 0, max) => (val * 100) / max;
const getColor = (perc) => {
  if (perc < 25) return "green";
  if (perc < 50) return "yellow";
  if (perc < 75) return "orange";
  return "red";
};

const Progress = React.forwardRef(
  ({ className, value, max, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          `bg-${getColor(getPerc(value, max))}-500`
        )}
        style={{
          transform: `translateX(-${100 - getPerc(value, max)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
