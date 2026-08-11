import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../common/context/LanguageContext';
import { useTheme } from '../../common/context/ThemeContext';
import { 
  Mail, 
  ArrowLeft, 
  Globe, 
  Sun, 
  Moon,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'emailRequired').email('emailInvalid')
});

const ForgotPassword = () => {
  const { lang, setLang, t } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: { email: '' }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Top Action Bar */}
      <div className="absolute top-4 right-4 lg:right-8 z-50 flex items-center space-x-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-1 border-r border-slate-200 dark:border-slate-800 pr-2 mr-1">
          <Globe className="w-4 h-4 text-slate-500" />
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="text-xs font-semibold bg-transparent focus:outline-none cursor-pointer"
            aria-label="Language Selector"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="te">తెలుగు</option>
          </select>
        </div>
        <button
          onClick={toggleTheme}
          className="p-1 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Theme Toggle"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-8"
      >
        <Link to="/login" className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-6 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>

        <div className="mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight">Reset Password</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Enter your registered email address and we'll send you verification instructions.
          </p>
        </div>

        <AnimatePresence>
          {success ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm space-y-2"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-semibold">Reset Link Sent!</span>
              </div>
              <p className="text-xs opacity-90">Please check your inbox for instructions to reset your password.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t('email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. Ramesh@civic.gov"
                    {...register('email')}
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50/50 dark:bg-slate-900 border ${
                      errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500/20 focus:border-blue-500'
                    } rounded-2xl focus:outline-none focus:ring-4 transition duration-200 text-sm`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" />{t(errors.email.message, 'validation')}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/15 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:transform active:scale-[0.98] transition-all duration-150 flex items-center justify-center space-x-2 text-sm cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <span>Send Reset Instructions</span>
                )}
              </button>
            </form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
