import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, Flame, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { Button } from '../../../components/common/Button';
import toast from 'react-hot-toast';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('elena.admin@fuse.io');
  const [password, setPassword] = useState('AdminSecret2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState('super_admin');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loginAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    setIsSubmitting(true);
    try {
      await loginAdmin(email, password, selectedRole);
      navigate(from, { replace: true });
    } catch {
      // error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleQuickFill = (role, demoEmail) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    setPassword('AdminSecret2026!');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0E0E0D] flex flex-col justify-center items-center p-4 sm:p-6 transition-colors">
      <div className="max-w-md w-full space-y-6">
        {/* Logo and Brand */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-[#171717] dark:bg-white text-white dark:text-[#171717] flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-[#FF7043]" />
            </div>
            <span className="text-xl font-extrabold text-[#171717] dark:text-[#F5F5F0] tracking-tight">
              FUSE<span className="text-[#FF7043]">.</span>
            </span>
          </Link>
          <div className="flex items-center justify-center gap-1.5 pt-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#71717A] dark:text-[#A8A8A2] bg-stone-200/60 dark:bg-[#262624] px-2 py-0.5 rounded-md">
              Admin Control Plane
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#171717] dark:text-[#F5F5F0] tracking-tight pt-2">
            Sign in to Admin Dashboard
          </h2>
          <p className="text-xs text-[#71717A] dark:text-[#A8A8A2]">
            Restricted access for authorized platform personnel only.
          </p>
        </div>

        {/* Demo Role Selector Pills */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-2xl p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#71717A] dark:text-[#A8A8A2]">
            <span>QUICK PREVIEW CREDENTIALS:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> 1-Click Fill
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            {[
              { role: 'super_admin', label: 'Super Admin', email: 'elena.admin@fuse.io' },
              { role: 'moderator', label: 'Moderator', email: 'david.mod@fuse.io' },
              { role: 'admin', label: 'Platform Admin', email: 'maya.ops@fuse.io' },
            ].map((item) => (
              <button
                type="button"
                key={item.role}
                onClick={() => handleRoleQuickFill(item.role, item.email)}
                className={`py-1.5 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                  selectedRole === item.role
                    ? 'border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717] shadow-xs'
                    : 'border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-[#71717A] dark:text-[#A8A8A2] hover:text-[#171717] dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fuse.io"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-white dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717] dark:focus:border-stone-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">
                  Password
                </label>
                <Link
                  to="/admin/forgot-password"
                  className="text-xs font-medium text-[#FF7043] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-white dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717] dark:focus:border-stone-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#171717] border-stone-300 focus:ring-0"
                />
                <span className="text-xs text-[#71717A] dark:text-[#A8A8A2]">
                  Keep admin session active (30 days)
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full mt-2"
              icon={ArrowRight}
              iconPosition="right"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In as Administrator'}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] flex items-start gap-2.5 text-[11px] text-[#71717A] dark:text-[#8C8C87]">
            <Shield className="w-4 h-4 text-[#FF7043] shrink-0 mt-0.5" />
            <span>
              All login attempts, IP addresses, and session activities are recorded in the immutable audit log.
            </span>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-[#71717A] dark:text-[#A8A8A2] hover:text-[#171717] dark:hover:text-white transition-colors"
          >
            ← Return to public Fuse platform
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
