import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400
            ${!error ? 'focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-sm' : 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-20'}
            ${props.disabled ? 'cursor-not-allowed bg-slate-50 text-slate-500' : ''}
            hover:border-slate-300
            ${className}`}
          {...props}
        />
        {error && (
          <div className="animate-in slide-in-from-top-1 absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-600 animate-in fade-in-0 slide-in-from-top-1">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
