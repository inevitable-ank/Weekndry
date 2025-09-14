import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  ...rest
}, ref) => {
  const baseClasses = "font-semibold rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus-visible:ring-blue-500";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white/80 hover:bg-white text-gray-700 border border-gray-200 shadow-lg hover:shadow-xl",
    ghost: "bg-transparent hover:bg-white/20 text-gray-600 hover:text-gray-800",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl",
  } as const;
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  } as const;

  const hoverClasses = "";

  // Check if custom className contains color classes (bg-, text-, border-)
  const hasCustomColors = className.includes('bg-') || className.includes('text-') || className.includes('border-')
  
  return (
    <motion.button
      ref={ref}
      type={type}
      className={`${baseClasses} ${hasCustomColors ? '' : variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...rest}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" aria-hidden />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0" aria-hidden>{icon}</span>
        )}
        <span className={loading ? 'opacity-0' : 'opacity-100'}>{children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0" aria-hidden>{icon}</span>
        )}
      </div>
    </motion.button>
  );
});

Button.displayName = 'Button';

