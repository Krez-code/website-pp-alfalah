import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass';
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-white border border-slate-200 shadow-sm hover:shadow-md',
    gradient: 'bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg'
  };

  return (
    <div className={`rounded-2xl p-6 transition-all duration-300 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
