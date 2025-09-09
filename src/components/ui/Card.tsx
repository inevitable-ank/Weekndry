import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  onClick,
  hover = true,
  padding = 'md',
}) => {
  const baseClasses = "rounded-2xl transition-all duration-300";
  
  const variantClasses = {
    default: "bg-white/90 backdrop-blur-sm border border-white/20 shadow-soft",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 shadow-glass",
    elevated: "bg-white shadow-xl border border-gray-100",
    outlined: "bg-transparent border-2 border-gray-200 hover:border-gray-300",
  };
  
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const hoverClasses = hover && onClick ? "hover:shadow-xl hover:scale-105 cursor-pointer" : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  const cardContent = (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${clickableClasses} ${className}`}>
      {children}
    </div>
  );

  if (onClick) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={hover ? { scale: 1.02, y: -2 } : {}}
        whileTap={hover ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

// Card sub-components for better composition
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <h3 className={`text-xl font-bold text-gray-800 ${className}`}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <p className={`text-gray-600 text-sm ${className}`}>
    {children}
  </p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);
