import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Flame, Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [email, setEmail] = useState('alex.morgan@fuse.io');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const validate = () => {
    const errs = {};
    if (!email) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      // error handled in context toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    toast('Google OAuth integration configured. Redirecting to mock session...', {
      icon: '🔐',
    });
    setTimeout(async () => {
      await login('alex.morgan@fuse.io', 'google-oauth-secret');
      navigate(from, { replace: true });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] dark:bg-[#111110] flex flex-col lg:flex-row transition-colors">
      {/* Left Column: Form */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-10 lg:p-16 max-w-xl mx-auto w-full">
        <div>
          {/* Brand & Theme Toggle Header */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#FF7043] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-[#171717] dark:text-[#F5F5F0]">
                  FUSE<span className="text-[#FF7043]">.</span>
                </span>
              </div>
            </Link>

            <ThemeToggle />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F5F5F0] tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-[#737373] dark:text-[#A8A8A2] mt-1.5">
              Enter your credentials to access your collaborative ideas and active teams.
            </p>
          </div>

          {/* Google Login Placeholder Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-white dark:bg-[#1A1A19] text-sm font-semibold text-[#171717] dark:text-[#F5F5F0] hover:bg-[#F8F8F5] dark:hover:bg-[#252522] transition-colors shadow-2xs mb-6 cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-[#E8E7E0] dark:border-[#2B2B27] w-full" />
            <span className="bg-[#F8F8F5] dark:bg-[#111110] px-3 text-xs uppercase tracking-wider text-[#A3A3A3] dark:text-[#737373] font-semibold absolute">
              or continue with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              error={errors.email}
              autoComplete="email"
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                error={errors.password}
                autoComplete="current-password"
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer hover:text-[#171717]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E8E7E0] dark:border-[#2B2B27] text-[#FF7043] focus:ring-[#FF7043]"
                />
                <span className="text-[#525252] dark:text-[#A8A8A2] font-medium">Remember me for 30 days</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-[#FF7043] hover:text-[#F4511E] font-semibold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={isSubmitting}
                icon={ArrowRight}
                iconPosition="right"
              >
                Sign In to Fuse
              </Button>
            </div>
          </form>

          <p className="text-center text-xs text-[#737373] dark:text-[#8C8C87] mt-8">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-[#FF7043] font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <div className="pt-8 text-xs text-[#A3A3A3] dark:text-[#666660] text-center sm:text-left">
          Protected by Fuse secure JWT session handling.
        </div>
      </div>

      {/* Right Column: Split Screen Feature Showcase */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#171717] to-[#262626] text-white p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FF7043]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF7043]">
          <Sparkles className="w-4 h-4" />
          <span>Next-Generation Collaboration</span>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <blockquote className="text-2xl font-bold leading-snug">
            "Your idea doesn't have to be complete to begin. Find your missing pieces on Fuse."
          </blockquote>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF7043]/20 flex items-center justify-center text-[#FF7043] font-bold text-sm">
                AI
              </div>
              <div>
                <p className="text-sm font-bold text-white">Similarity Engine v2.4</p>
                <p className="text-xs text-stone-400">RAG Vector match ready for DRF endpoints</p>
              </div>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Instantly detects related concepts, prevents duplicate wheel-reinventing, and matches you with designers and engineers craving your exact challenge.
            </p>
          </div>
        </div>

        <div className="relative z-10 text-xs text-stone-400">
          Fuse Platform — Final Year Project Edition
        </div>
      </div>
    </div>
  );
};
