import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { adminAuthService } from '../../../services/adminAuthService';
import toast from 'react-hot-toast';

export const AdminForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await adminAuthService.requestPasswordReset(email);
      setSubmitted(true);
      toast.success('Recovery instructions dispatched');
    } catch {
      toast.error('Failed to request password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0E0E0D] flex flex-col justify-center items-center p-4 sm:p-6 transition-colors">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#171717] dark:bg-white text-white dark:text-[#171717] flex items-center justify-center mx-auto shadow-sm">
            <Shield className="w-6 h-6 text-[#FF7043]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#171717] dark:text-[#F5F5F0] tracking-tight">
            Reset Admin Password
          </h2>
          <p className="text-xs text-[#71717A] dark:text-[#A8A8A2]">
            Enter your authorized administrative email address to receive an emergency recovery token.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {submitted ? (
            <div className="text-center space-y-4 py-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
                Recovery Email Dispatched
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] leading-relaxed">
                If <strong className="text-[#171717] dark:text-white">{email}</strong> matches an authorized platform administrator, a cryptographically signed recovery token has been issued.
              </p>
              <div className="pt-2">
                <Link to="/admin/login">
                  <Button variant="secondary" size="md" className="w-full">
                    Return to Admin Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full mt-2"
              >
                {loading ? 'Validating...' : 'Send Recovery Token'}
              </Button>
            </form>
          )}

          <div className="pt-2 border-t border-[#F0EFEA] dark:border-[#22221F] text-center">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-[#71717A] dark:text-[#A8A8A2] hover:text-[#171717] dark:hover:text-white font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to admin login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordPage;
