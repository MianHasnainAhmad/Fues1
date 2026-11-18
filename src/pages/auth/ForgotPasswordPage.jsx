import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await authService.forgotPassword(email);
      setIsSubmitted(true);
      toast.success('Reset email dispatched!');
    } catch (err) {
      setError(err.message || 'Failed to dispatch reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8E7E0] p-8 sm:p-10 shadow-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FF7043] flex items-center justify-center text-white shadow-xs">
              <Flame className="w-5 h-5 fill-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#171717]">
              FUSE<span className="text-[#FF7043]">.</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#171717]">Reset your password</h1>
          <p className="text-xs sm:text-sm text-[#737373] mt-1.5">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto border border-[#A7F3D0]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#171717]">Check your inbox</h3>
            <p className="text-xs text-[#525252] leading-relaxed">
              We've dispatched password reset instructions to <span className="font-semibold text-[#171717]">{email}</span>. Click the link in the email to set a new password.
            </p>
            <div className="pt-2">
              <Link to="/reset-password">
                <Button variant="outline" size="md" className="w-full mb-3">
                  Open Reset Form (Demo)
                </Button>
              </Link>
              <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF7043] hover:underline">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              error={error}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Send Reset Link
            </Button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#737373] hover:text-[#171717] dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
