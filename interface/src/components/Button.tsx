import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonVariants = "primary" | "secondary" | "outline" | "success" | "danger"

interface ButtonPops extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    variant?: ButtonVariants,
    fullWidth?: boolean,
    isLoading?: boolean,
}

export const Button = ({
    children,
    variant = "primary",
    fullWidth = false,
    isLoading = false,
    className, disabled,
    ...rest
}: ButtonPops) => {

    const variantClasses = {
        primary: "bg-primary-500 text-[#051626] font-semibol hover:bg-primary-600 active:translate-y-0",
        outline: "border border-primary-500 text-primary-500 hover:bg-primary-500/10",
        secondary: "bg-gray-800 text-white hover:bg-gray-700",
        success: "bg-green-500 text-[#051626] hover:brightness-90",
        danger: "bg-red-500 text-white hover:brightness-90",
    }

    const renderLoading = () => (
        <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            </svg>
            {children}
        </div>
    )
    return (
        <button type="button" className={`cursor-pointer px-5 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center
                ${variantClasses[variant]}
                ${isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ""}
                ${className}
                ${fullWidth ? "w-full" : ""}
                `}
            disabled={isLoading || disabled}
            {...rest}
        >
            {isLoading ? renderLoading() : children}
        </button>

    )
}