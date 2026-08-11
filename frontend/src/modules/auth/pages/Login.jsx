import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../../common/context/LanguageContext';
import { useTheme } from '../../common/context/ThemeContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Globe,
  Sun,
  Moon,
  ArrowRight,
  Building2,
  Cpu,
  Route,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// ─── Validation Schema ───────────────────────────────────────────────
// NO role field - role is determined SOLELY by the backend
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

// ─── Left Side Illustration Slides ──────────────────────────────────
const slides = [
  {
    icon: Building2,
    gradient: 'from-blue-500 to-indigo-600',
    title: 'Smart City Governance',
    description:
      'AI-powered platform connecting citizens with government departments for efficient civic issue resolution.',
  },
  {
    icon: Cpu,
    gradient: 'from-teal-400 to-cyan-600',
    title: 'Intelligent Grievance Management',
    description:
      'Automated routing, prioritization, and real-time tracking of public grievances using advanced AI algorithms.',
  },
  {
    icon: Route,
    gradient: 'from-emerald-400 to-teal-600',
    title: 'Digital Public Services',
    description:
      'Streamlined workflows connecting citizens, department admins, and system administrators in one unified platform.',
  },
  {
    icon: ShieldCheck,
    gradient: 'from-violet-500 to-purple-600',
    title: 'Secure & Scalable',
    description:
      'Enterprise-grade security with role-based access control ensuring data privacy and regulatory compliance.',
  },
];

// ─── Animated Background Particles ──────────────────────────────────
const ParticleField = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// ─── Floating Shapes ────────────────────────────────────────────────
const FloatingShapes = () => {
  const shapes = [
    { icon: '●', size: 40, x: 10, y: 20, delay: 0, duration: 6 },
    { icon: '◆', size: 30, x: 80, y: 15, delay: 1, duration: 7 },
    { icon: '■', size: 35, x: 15, y: 70, delay: 2, duration: 5 },
    { icon: '▲', size: 25, x: 85, y: 75, delay: 0.5, duration: 8 },
    { icon: '●', size: 20, x: 50, y: 10, delay: 1.5, duration: 6 },
    { icon: '◆', size: 45, x: 70, y: 60, delay: 3, duration: 7 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-white/30 text-2xl font-light"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: s.size,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        >
          {s.icon}
        </motion.div>
      ))}
    </div>
  );
};

// ─── Main Login Component ───────────────────────────────────────────
const Login = () => {
  const { login, error: apiError, loading: authLoading, isAuthenticated, getDashboardRoute } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getDashboardRoute(), { replace: true });
    }
  }, [isAuthenticated, getDashboardRoute, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  /**
   * Login submission - NEVER passes role to backend.
   * Role is determined exclusively by the backend response.
   */
  const onSubmit = useCallback(
    async (data) => {
      setIsSubmitting(true);
      setErrorMessage('');

      try {
        // Call login WITHOUT role parameter - backend determines role
        await login(data.email, data.password);
        setLoginSuccess(true);
        // Redirection is handled by AuthContext based on backend-provided role
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.message ||
          'Login failed. Please check your credentials.';
        setErrorMessage(msg);
      } finally {
        setIsSubmitting(false);
      }
    },
    [login]
  );

  const currentSlide = slides[slideIndex];
  const SlideIcon = currentSlide.icon;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 transition-colors duration-300 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 selection:text-blue-500">
      {/* ─── Global Action Bar ─────────────────────────────────── */}
      <div className="fixed top-4 right-4 lg:right-8 z-50 flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 shadow-lg shadow-slate-900/5">
        {/* Language Selector */}
        <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-800 pr-2 mr-1">
          <Globe className="w-4 h-4 text-slate-400" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="text-xs font-semibold bg-transparent text-slate-600 dark:text-slate-300 focus:outline-none cursor-pointer"
            aria-label="Select language"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="te">తెలుగు</option>
          </select>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-blue-500" />
          )}
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LEFT SIDE - Animated Illustration / Brand
          ═══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0f172a] flex-col justify-between p-10 xl:p-14 text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,118,110,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <ParticleField />
        <FloatingShapes />

        {/* Brand Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 ring-2 ring-white/10"
          >
            <span className="font-extrabold text-xl tracking-tight drop-shadow-sm">
              C
            </span>
          </motion.div>
          <div>
            <h1 className="font-bold text-xl tracking-wide drop-shadow-sm">
              Civic AI
            </h1>
            <p className="text-[10px] text-blue-300/80 font-semibold uppercase tracking-[0.2em]">
              AI-Powered Civic Management Platform
            </p>
          </div>
        </div>

        {/* Animated Slides */}
        <div className="relative z-10 my-auto max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="space-y-6"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="inline-flex p-4 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl"
              >
                <SlideIcon className="w-14 h-14 text-white/90" />
              </motion.div>

              <div className="space-y-3">
                <h2 className="text-3xl xl:text-4xl font-bold tracking-tight leading-tight drop-shadow-sm">
                  {currentSlide.title}
                </h2>
                <p className="text-base xl:text-lg text-blue-100/80 leading-relaxed max-w-md">
                  {currentSlide.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="flex gap-2 mt-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === slideIndex
                    ? 'w-10 bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Left Side Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-blue-200/60">
          <p>© {new Date().getFullYear()} Civic AI. Government Digital Service.</p>
          <div className="flex gap-4">
            <a
              href="#privacy"
              className="hover:text-white transition-colors"
              tabIndex={-1}
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-white transition-colors"
              tabIndex={-1}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          RIGHT SIDE - Login Form
          ═══════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-14 relative overflow-hidden">
        {/* Decorative Background Blobs */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-400/5 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-teal-400/5 dark:bg-teal-900/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* ─── Glassmorphism Card ─────────────────────────────── */}
          <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/50 dark:border-slate-800/50 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/20 p-8 sm:p-10">
            {/* Gradient border accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#0F766E] to-[#10B981] rounded-t-3xl" />

            {/* ── Header ─────────────────────────────────────── */}
            <div className="text-center mb-8">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
                  <span className="font-extrabold text-white text-lg">C</span>
                </div>
                <span className="font-bold text-lg text-slate-800 dark:text-white">
                  Civic AI
                </span>
              </div>

              {/* Welcome Message */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white"
              >
                Welcome Back
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-2 text-sm text-slate-500 dark:text-slate-400"
              >
                Sign in to access your digital governance dashboard.
              </motion.p>
            </div>

            {/* ── Alert Messages ───────────────────────────────── */}
            <AnimatePresence>
              {(errorMessage || apiError) && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start gap-3 text-red-700 dark:text-red-300 text-sm overflow-hidden"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage || apiError}</span>
                </motion.div>
              )}

              {loginSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-3 text-emerald-700 dark:text-emerald-300 text-sm"
                  role="status"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 animate-bounce" />
                  <div>
                    <p className="font-semibold">Login Successful!</p>
                    <p className="text-xs opacity-90">
                      Verifying credentials & redirecting to your dashboard...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Form ─────────────────────────────────────────── */}
            {/* NO role selector, NO hidden role field, NO role detection via URL */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@civic.gov.in"
                    {...register('email')}
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50/60 dark:bg-slate-900/60 border ${
                      errors.email
                        ? 'border-red-400 dark:border-red-500 focus:ring-red-500/20'
                        : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-slate-300 dark:group-hover:border-slate-700'
                    } rounded-2xl focus:outline-none focus:ring-4 transition-all duration-200 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-[#2563EB] hover:text-[#1d4ed8] dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...register('password')}
                    className={`w-full pl-11 pr-11 py-3 bg-slate-50/60 dark:bg-slate-900/60 border ${
                      errors.password
                        ? 'border-red-400 dark:border-red-500 focus:ring-red-500/20'
                        : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-slate-300 dark:group-hover:border-slate-700'
                    } rounded-2xl focus:outline-none focus:ring-4 transition-all duration-200 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600`}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register('rememberMe')}
                  className="w-4 h-4 text-[#2563EB] border-slate-300 dark:border-slate-700 rounded focus:ring-[#2563EB] focus:ring-offset-0 bg-transparent cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2.5 text-sm text-slate-600 dark:text-slate-400 font-medium cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || loginSuccess || !isValid}
                whileHover={!isSubmitting && !loginSuccess && isValid ? { scale: 1.01 } : {}}
                whileTap={!isSubmitting && !loginSuccess && isValid ? { scale: 0.99 } : {}}
                className={`w-full py-3.5 px-4 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#2563EB] disabled:from-blue-400 disabled:to-blue-400 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer disabled:cursor-not-allowed`}
              >
                {isSubmitting || authLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* ── Divider ───────────────────────────────────────── */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                Or continue with
              </span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              className="w-full py-3 px-4 bg-transparent border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl flex items-center justify-center gap-3 text-sm font-semibold transition-all duration-200 cursor-pointer text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Google</span>
            </button>

            {/* ── Card Footer ──────────────────────────────────── */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Don&apos;t have an account?{' '}
                <Link
                  to="/register"
                  className="font-bold text-[#2563EB] hover:text-[#1d4ed8] dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
                >
                  Create an Account
                </Link>
              </p>

              <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-400 dark:text-slate-500">
                <Link to="/help" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  Help Center
                </Link>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <a href="#privacy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  Privacy Policy
                </a>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <a href="#terms" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>

          {/* ── Mobile Footer ──────────────────────────────────── */}
          <div className="lg:hidden mt-6 text-center text-xs text-slate-400 dark:text-slate-600">
            <p>© {new Date().getFullYear()} Civic AI. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

