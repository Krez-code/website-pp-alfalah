import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

interface CommonButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

interface ButtonAsButtonProps extends CommonButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  as?: 'button';
}

interface ButtonAsAnchorProps extends CommonButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  as: 'a';
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const variants: Record<string, string> = {
  primary: 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30',
  secondary: 'bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
};

const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-sm font-semibold rounded-2xl',
  lg: 'px-8 py-4 text-base font-semibold rounded-2xl',
};

export function Button({ children, variant = 'primary', size = 'md', className = '', as = 'button', icon, ...props }: ButtonProps) {
  const sharedClass = `inline-flex items-center justify-center gap-2 transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (as === 'a') {
    return (
      <a className={sharedClass} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button className={sharedClass} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
