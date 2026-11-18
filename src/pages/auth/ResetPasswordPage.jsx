import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!password) {
      errs.password = 'New password is required';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await authService.resetPassword(password);
      setIsSuccess(true);
      toast.success('Password updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8E7E0] p-8 sm:p-10 shadow-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FF7043] flex items-center justify-center text-white shadow-xs">
              <Flame className="w-5 h-5 fill-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#171717]">
              FUSE<span className="text-[#FF7043]">.</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#171717]">Set new password</h1>
          <p className="text-xs sm:text-sm text-[#737373] mt-1.5">
            Your new password must be at least 8 characters long.
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto border border-[#A7F3D0]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#171717]">Password reset complete!</h3>
            <p className="text-xs text-[#525252]">
              You can now sign in using your new credentials.
            </p>
            <div className="pt-2">
              <Link to="/login">
                <Button variant="primary" size="md" className="w-full">
                  Proceed to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              error={errors.confirmPassword}
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
              Update Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
