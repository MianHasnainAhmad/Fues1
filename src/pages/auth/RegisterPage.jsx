import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Eye, EyeOff, Lock, Mail, User, ArrowRight, Check } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    if (!agreeTerms) {
      errs.terms = 'You must agree to the Community Charter';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      // toast shown in context
    } finally {
      setIsSubmitting(false);
    }
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

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F5F5F0] tracking-tight">
              Create your builder profile
            </h1>
            <p className="text-sm text-[#737373] dark:text-[#A8A8A2] mt-1.5">
              Join thousands of creators sharing incomplete ideas and discovering teammates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              error={errors.name}
            />

            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@university.edu or name@work.com"
              error={errors.email}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              error={errors.password}
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

            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type password"
              error={errors.confirmPassword}
            />

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-[#E8E7E0] dark:border-[#2B2B27] text-[#FF7043] focus:ring-[#FF7043]"
                />
                <span className="text-[#525252] dark:text-[#A8A8A2]">
                  I agree to the{' '}
                  <Link to="/community" className="text-[#FF7043] font-semibold hover:underline">
                    Fuse Community Charter
                  </Link>{' '}
                  and promise to treat incomplete ideas with psychological safety and respect.
                </span>
              </label>
              {errors.terms && <p className="text-xs text-red-600 mt-1">{errors.terms}</p>}
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
                Create Account
              </Button>
            </div>
          </form>

          <p className="text-center text-xs text-[#737373] dark:text-[#8C8C87] mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF7043] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="pt-8 text-xs text-[#A3A3A3] dark:text-[#666660] text-center sm:text-left">
          Free forever for open collaboration. No credit card required.
        </div>
      </div>

      {/* Right Column: Split Screen Feature Showcase */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#171717] to-[#262626] text-white p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FF7043]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-[#FF7043]">
            JOIN 3,400+ BUILDERS
          </span>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <h2 className="text-3xl font-extrabold leading-snug">
            "Your rough draft is someone else's missing puzzle piece."
          </h2>

          <div className="space-y-3">
            {[
              'Publish unpolished concepts with zero judgment',
              'Match with co-founders and specialized contributors',
              'Automated AI semantic similarity detection',
              'Integrated Kanban boards, milestones, and decision logs',
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-stone-300">
                <div className="w-5 h-5 rounded-full bg-[#FF7043]/20 flex items-center justify-center text-[#FF7043] shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-stone-400">
          Fuse Community — Built for Human-Centered Collaboration
        </div>
      </div>
    </div>
  );
};
