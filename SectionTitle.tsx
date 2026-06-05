import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  badge?: string;
}

export function SectionTitle({ title, subtitle, children, badge }: SectionTitleProps) {
  return (
    <div className="mb-10 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          {badge && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold capitalize tracking-wider text-primary">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {badge}
            </span>
          )}
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
          )}
        </div>
        {children}
      </div>
      {subtitle && (
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
