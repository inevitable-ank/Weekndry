import React from 'react';
import { motion } from 'framer-motion';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'full',
  className = '',
  icon,
  removable = false,
  onRemove,
}) => {
  const baseClasses = "inline-flex items-center font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500";
  
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    primary: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    secondary: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    danger: "bg-red-100 text-red-800 hover:bg-red-200",
    info: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
  };
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const hoverClasses = removable ? "hover:scale-105 cursor-pointer" : "";

  return (
    <motion.span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses[rounded]} ${hoverClasses} ${className}`}
      whileHover={removable ? { scale: 1.05 } : {}}
      whileTap={removable ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {icon && (
        <span className="mr-1 flex-shrink-0">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 flex-shrink-0 hover:bg-black/10 rounded-full p-0.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </motion.span>
  );
};

// Activity-specific badge variants
export const ActivityBadge: React.FC<{ category: string; className?: string }> = ({ 
  category, 
  className = '' 
}) => {
  const categoryColors = {
    food: { variant: 'warning' as const, icon: '🍽️' },
    entertainment: { variant: 'primary' as const, icon: '🎬' },
    outdoor: { variant: 'success' as const, icon: '🌳' },
    relaxation: { variant: 'info' as const, icon: '🧘' },
    learning: { variant: 'secondary' as const, icon: '📚' },
    social: { variant: 'danger' as const, icon: '👥' },
    fitness: { variant: 'success' as const, icon: '💪' },
    travel: { variant: 'info' as const, icon: '✈️' },
  };

  const config = categoryColors[category.toLowerCase() as keyof typeof categoryColors] || {
    variant: 'default' as const,
    icon: '⭐'
  };

  return (
    <Badge variant={config.variant} icon={config.icon} className={className}>
      {category}
    </Badge>
  );
};


