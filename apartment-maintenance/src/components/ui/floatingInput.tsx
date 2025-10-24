import * as React from "react"
import { cn } from "@/lib/utils"

interface FloatingInputProps extends React.ComponentProps<"input"> {
  label: string
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, className, type, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          ref={ref}
          placeholder=" " // needed for :placeholder-shown
          className={cn(
            "peer w-full rounded-md border border-input bg-transparent px-3 pt-5 pb-2 text-base text-foreground placeholder-transparent focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          {...props}
        />
        <label
          className={cn(
            "absolute left-3 top-3 text-muted-foreground text-base transition-all duration-200 ease-in-out",
            // Label stays up if input is focused OR has value
            "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0",
            "peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-foreground peer-focus:bg-background peer-focus:px-1",
            // Label stays floated when input has value
            "peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-foreground peer-not-placeholder-shown:bg-background peer-not-placeholder-shown:px-1"
          )}
        >
          {label}
        </label>
      </div>
    )
  }
)

FloatingInput.displayName = "FloatingInput"

export { FloatingInput }
