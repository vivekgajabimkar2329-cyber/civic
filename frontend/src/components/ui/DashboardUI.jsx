import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

/**
 * Premium Card component matching the unified enterprise design.
 */
export const Card = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  bodyClassName = '',
  onClick
}) => {
  return (
    <section
      onClick={onClick}
      className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:border-blue-200/80' : ''
      } hover:-translate-y-1 hover:shadow-card ${className}`}
    >
      {(title || subtitle || action) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-[17px] font-bold tracking-tight text-[#0F172A]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1 text-xs font-medium text-slate-500">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
};

/**
 * Premium KPI StatCard component with optional sparkline charts and trend indicators.
 */
export const StatCard = ({
  label,
  value,
  change,
  negative,
  positive = true,
  icon: Icon,
  chartData,
  chartColor = '#2563EB',
  className = '',
  iconBg = 'bg-blue-50 text-[#2563EB]'
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card flex flex-col justify-between h-[150px] ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
            {label}
          </span>
          <span className="text-3xl font-extrabold text-[#0F172A] block leading-none tracking-tight">
            {value}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {chartData && (
            <div className="w-[64px] h-[30px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.map((v, i) => ({ i, v }))}>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={chartColor}
                    fill={chartColor}
                    fillOpacity={0.1}
                    strokeWidth={1.8}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
          {Icon && (
            <div className={`p-2.5 rounded-xl shrink-0 ${iconBg}`}>
              <Icon size={20} strokeWidth={2.2} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-50 mt-auto">
        {change && (
          <>
            {negative ? (
              <ArrowDownRight size={14} className="text-red-500" />
            ) : (
              <ArrowUpRight size={14} className="text-emerald-500" />
            )}
            <span
              className={`text-[12px] font-bold ${
                negative ? 'text-red-500' : 'text-emerald-500'
              }`}
            >
              {change}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">vs last period</span>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * Premium HeroSection banner matching the design guidelines.
 */
export const HeroSection = ({
  badgeText,
  badgeIcon: BadgeIcon,
  title,
  description,
  actions,
  rightWidget,
  className = ''
}) => {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-blue-900/10 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#2563EB] p-6 text-white shadow-elevated sm:p-8 animate-fade-in ${className}`}
    >
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          {badgeText && (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md uppercase tracking-wider">
              {BadgeIcon && <BadgeIcon size={14} className="text-blue-300" />}
              {badgeText}
            </div>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-xl">
            {description}
          </p>
          {actions && <div className="flex flex-wrap gap-3 pt-2">{actions}</div>}
        </div>

        {rightWidget && (
          <div className="w-full lg:max-w-xs shrink-0">{rightWidget}</div>
        )}
      </div>
    </section>
  );
};

/**
 * Premium Button component conforming to standard palette.
 */
export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  icon: Icon,
  className = '',
  size = 'md'
}) => {
  const baseStyle =
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-xl focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4.5 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base'
  };

  const variants = {
    primary:
      'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)] focus:ring-4 focus:ring-blue-100 active:scale-98',
    secondary:
      'bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-sm focus:ring-4 focus:ring-slate-100 active:scale-98',
    outline:
      'border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 shadow-sm focus:ring-4 focus:ring-slate-100 active:scale-98',
    subtle: 'text-slate-600 hover:text-slate-900 hover:bg-slate-150 transition-colors',
    danger:
      'bg-red-600 hover:bg-red-700 text-white shadow-[0_4px_12px_rgba(220,38,38,0.2)] focus:ring-4 focus:ring-red-100 active:scale-98'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={16} strokeWidth={2.2} />}
      {children}
    </button>
  );
};

/**
 * Premium Table component matching the unified enterprise design.
 */
export const Table = ({ headers, children, className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-slate-200/80 bg-white scrollbar-thin ${className}`}>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {children}
        </tbody>
      </table>
    </div>
  );
};
