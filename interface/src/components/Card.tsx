import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
    hover?: boolean;
    glowEffect?: boolean;
    className?: string;
}

export const Card = ({
    children,
    className,
    glowEffect,
    hover,
    icon,
    subtitle,
    title
}: CardProps) => {
    return (
        <div
            className={`bg-gray-900 rounded-xl cursor-pointer border border-gray-700 shadow-md p-6 transition-all
            ${hover ? "hover:border-primary-500 hover:shadow-lg hover:-translate-y-0.5" : ""}
            ${glowEffect ? "glow" : ""}
            ${className}
            `}
        >
            {(title || icon) && (
                <div className="flex items-center space-x-3 mb-4">
                    {icon && (
                        <div className="p-2 bg-primary-500/10 rounded-xl flex items-center justify center">
                            {icon}
                        </div>
                    )}
                    {(title || subtitle) && (
                        <div>
                            {title && <h3 className="text-lg font-medium">{title}</h3>}
                            {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
                        </div>
                    )}
                </div>
            )}
            {children}
        </div>
    )
}