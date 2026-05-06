import React from 'react';
import { cn } from '../utils';

const Button = ({ 
  children, 
  onClick, 
  variant = 'default', // 'default', 'accent', 'secondary', 'danger'
  size = 'default', // 'default', 'wide'
  className 
}) => {
  const baseStyles = "relative flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-95 overflow-hidden group select-none";
  
  const variants = {
    default: "bg-surface-hover/80 text-foreground hover:bg-surface-hover hover:shadow-sm border border-border/50",
    secondary: "bg-surface text-foreground hover:bg-surface-hover border border-border/50 shadow-sm",
    accent: "bg-accent text-accent-foreground hover:bg-accent-hover shadow-md shadow-accent/20 border border-accent/20",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
  };

  const sizes = {
    default: "h-14 w-full text-lg",
    wide: "h-14 w-full text-lg col-span-2",
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
    >
      {/* Subtle hover highlight */}
      <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
