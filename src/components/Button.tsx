import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-display uppercase tracking-widest transition-all duration-200 border-4 border-foreground clip-path-p5-button overflow-hidden group";
  
  const sizeStyles = {
    sm: "px-6 py-2 text-xl",
    md: "px-10 py-3 text-3xl",
    lg: "px-16 py-4 text-5xl"
  };

  const variantStyles = {
    primary: "bg-text text-background hover:bg-accent hover:text-white hover:border-text shadow-p5 hover:translate-y-1 hover:translate-x-1",
    secondary: "bg-surface text-text hover:bg-accent hover:text-white shadow-brutal hover:shadow-p5 hover:translate-y-1 hover:translate-x-1",
    ghost: "border-none bg-transparent text-text hover:text-accent clip-path-none"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9, rotate: -3 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="skew-x-[15deg] block relative z-10">
        {children}
      </span>
      {/* P5 styled hover strike-through effect */}
      <div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out skew-x-12 z-0" />
    </motion.button>
  );
};