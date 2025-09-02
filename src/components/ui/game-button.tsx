import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gameButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        game: "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300",
        trivia: "bg-gradient-to-br from-trivia-science to-info text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300",
        memorama: "bg-gradient-to-br from-success to-trivia-nature text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300",
        quiz: "bg-gradient-to-br from-warning to-trivia-history text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300",
        category: "bg-gradient-to-br from-card to-muted border-2 border-border text-foreground shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 hover:border-primary",
        success: "bg-gradient-to-br from-success to-trivia-nature text-success-foreground shadow-lg hover:shadow-xl",
        retry: "bg-gradient-to-br from-warning to-trivia-history text-warning-foreground shadow-lg hover:shadow-xl"
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-16 px-8 py-4",
        xl: "h-24 px-12 py-6 text-lg",
        game: "h-40 w-64 p-8 flex-col text-lg"
      },
    },
    defaultVariants: {
      variant: "game",
      size: "default",
    },
  }
)

export interface GameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gameButtonVariants> {
  asChild?: boolean
}

const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(gameButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GameButton.displayName = "GameButton"

export { GameButton, gameButtonVariants }