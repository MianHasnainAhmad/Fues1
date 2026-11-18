import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Lock,
  Bell,
  Shield,
  Trash2,
  AlertTriangle,
  LogOut,
  Save,
  CheckCircle2,
  Sun,
  Moon,
  Monitor,
  Palette,
} from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

export const SettingsPage = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme, isDark, accent, setAccent, accents } = useTheme();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('account'); // 'account' | 'appearance' | 'security' | 'notifications' | 'privacy'

  // Account form
  const [email, setEmail] = useState(user?.email || 'alex.morgan@fuse.io');
  const [fullName, setFullName] = useState(user?.name || 'Alex Morgan');

  // Security form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification toggles
  const [notifRequests, setNotifRequests] = useState(true);
  const [notifComments, setNotifComments] = useState(true);
  const [notifDigest, setNotifDigest] = useState(false);

  // Privacy toggles
  const [publicProfile, setPublicProfile] = useState(true);
  const [showEmail, setShowEmail] = useState(false);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleSaveAccount = (e) => {
    e.preventDefault();
    toast.success('Account information saved!');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }
    await logout();
    toast.success('Account successfully deleted');
    navigate('/');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const renderDangerZone = () => (
    <div className="bg-rose-50/70 dark:bg-[#1E1111] rounded-3xl border border-rose-200 dark:border-rose-900/60 p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60 flex items-center justify-center shrink-0">
          <Trash2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-rose-950 dark:text-rose-200">Danger Zone</h3>
          <p className="text-xs text-rose-700 dark:text-rose-400 font-medium">Irreversible Account Actions</p>
        </div>
      </div>
      <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed max-w-xl">
        Permanently delete your account, your published ideas, task assignments, and collaborative karma. This action cannot be reversed.
      </p>
      <div className="pt-1">
        <Button
          variant="danger-solid"
          size="sm"
          icon={Trash2}
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E7E0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            Account & Platform Settings
          </h1>
          <p className="text-sm text-[#737373] mt-1">
            Manage your credentials, notification triggers, and privacy visibility.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          icon={LogOut}
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar (Horizontal swipe on mobile, vertical stack on desktop) */}
        <div className="flex md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'account', label: 'Account Profile', icon: Settings },
            { id: 'appearance', label: 'Appearance & Theme', icon: Palette },
            { id: 'security', label: 'Password & Security', icon: Lock },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'privacy', label: 'Privacy & Visibility', icon: Shield },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-left shrink-0 md:w-full md:shrink whitespace-nowrap ${
                  activeSection === item.id
                    ? 'bg-[#171717] text-white shadow-xs dark:bg-white dark:text-[#171717]'
                    : 'text-[#525252] hover:text-[#171717] hover:bg-white dark:text-[#A8A8A2] dark:hover:text-white dark:hover:bg-[#262624]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Section (3 Cols) */}
        <div className="md:col-span-3 space-y-6">
          {/* Account Profile Section */}
          {activeSection === 'account' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#171717]">Account Information</h3>
                  <p className="text-xs text-[#737373] mt-0.5">Primary email and account contact info.</p>
                </div>

                <form onSubmit={handleSaveAccount} className="space-y-4">
                  <Input
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <div className="pt-2">
                    <Button type="submit" variant="primary" icon={Save}>
                      Save Account Changes
                    </Button>
                  </div>
                </form>
              </div>

              {renderDangerZone()}
            </div>
          )}

          {/* Appearance & Theme Section */}
          {activeSection === 'appearance' && (
            <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-8">
              <div>
                <h3 className="text-base font-bold text-[#171717]">Appearance & Interface Theme</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Customize your viewing experience with Light or Dark theme.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Light Mode Option */}
                <div
                  onClick={() => {
                    setTheme('light');
                    toast.success('Switched to Warm Light theme');
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    !isDark
                      ? 'border-[#FF7043] bg-[#FFF0EB]/40 ring-2 ring-[#FF7043]'
                      : 'border-[#E8E7E0] hover:bg-[#F8F8F5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                        <Sun className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[#171717]">Warm Light</h4>
                    </div>
                    {!isDark && <CheckCircle2 className="w-5 h-5 text-[#FF7043]" />}
                  </div>
                  <p className="text-xs text-[#525252] leading-relaxed">
                    Warm off-white background with crisp charcoal typography and vibrant brand accents.
                  </p>
                </div>

                {/* Dark Mode Option */}
                <div
                  onClick={() => {
                    setTheme('dark');
                    toast.success('Switched to Charcoal Dark theme');
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    isDark
                      ? 'border-[#FF7043] bg-[#FFF0EB]/20 ring-2 ring-[#FF7043]'
                      : 'border-[#E8E7E0] hover:bg-[#F8F8F5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                        <Moon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[#171717]">Charcoal Dark</h4>
                    </div>
                    {isDark && <CheckCircle2 className="w-5 h-5 text-[#FF7043]" />}
                  </div>
                  <p className="text-xs text-[#525252] leading-relaxed">
                    Deep charcoal and obsidian palette designed for low-light focus and reduced eye strain.
                  </p>
                </div>
              </div>

              {/* Brand Accent Color Section */}
              <div className="pt-6 border-t border-[#E8E7E0] dark:border-[#2B2B27]">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-[#171717]">Brand Accent Palette</h3>
                  <p className="text-xs text-[#737373] mt-0.5">
                    Choose the primary color signature used for action buttons, active tabs, tags, and highlights.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {accents.map((item) => {
                    const isSelected = accent === item.id;
                    const previewColor = isDark ? item.hexDark : item.hex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setAccent(item.id);
                          toast.success(`Switched to ${item.name} palette`);
                        }}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                          isSelected
                            ? 'border-[#FF7043] bg-[#FFF0EB]/30 ring-2 ring-[#FF7043]'
                            : 'border-[#E8E7E0] hover:bg-[#F8F8F5]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-5 h-5 rounded-full shadow-xs shrink-0"
                              style={{ backgroundColor: previewColor }}
                            />
                            <h4 className="text-sm font-bold text-[#171717]">{item.name}</h4>
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-[#FF7043]" />}
                        </div>

                        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full w-fit bg-stone-100 dark:bg-[#262624] text-[#737373]">
                          {item.badge}
                        </span>

                        <p className="text-xs text-[#525252] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Security & Password Section */}
          {activeSection === 'security' && (
            <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#171717]">Change Password</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Update your credentials for secure Django REST Framework authentication.
                </p>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <Input
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  required
                />

                <div className="pt-2">
                  <Button type="submit" variant="primary" icon={Save}>
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#171717]">Notification Preferences</h3>
                <p className="text-xs text-[#737373] mt-0.5">Choose how and when Fuse alerts you.</p>
              </div>

              <div className="space-y-4 divide-y divide-[#F0EFEA]">
                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#171717]">Collaboration Proposals</h4>
                    <p className="text-xs text-[#737373]">Notify me immediately when someone applies to help my idea.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifRequests}
                    onChange={(e) => setNotifRequests(e.target.checked)}
                    className="rounded border-[#E8E7E0] text-[#FF7043] focus:ring-[#FF7043]"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#171717]">Comments & Peer Feedback</h4>
                    <p className="text-xs text-[#737373]">Notify when creators discuss my incomplete idea.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifComments}
                    onChange={(e) => setNotifComments(e.target.checked)}
                    className="rounded border-[#E8E7E0] text-[#FF7043] focus:ring-[#FF7043]"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#171717]">Weekly Digest</h4>
                    <p className="text-xs text-[#737373]">A summary of trending incomplete concepts in your category.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifDigest}
                    onChange={(e) => setNotifDigest(e.target.checked)}
                    className="rounded border-[#E8E7E0] text-[#FF7043] focus:ring-[#FF7043]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={() => toast.success('Notification preferences saved')}
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          )}

          {/* Privacy & Visibility Section */}
          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#171717]">Community Privacy</h3>
                  <p className="text-xs text-[#737373] mt-0.5">Control how your builder profile appears to others.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#171717]">Public Discovery Profile</h4>
                      <p className="text-xs text-[#737373]">Allow other founders to discover you on the Collaborators page.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={publicProfile}
                      onChange={(e) => setPublicProfile(e.target.checked)}
                      className="rounded border-[#E8E7E0] text-[#FF7043] focus:ring-[#FF7043]"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#171717]">Display Email Address</h4>
                      <p className="text-xs text-[#737373]">Expose your direct email on your public profile card.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={showEmail}
                      onChange={(e) => setShowEmail(e.target.checked)}
                      className="rounded border-[#E8E7E0] text-[#FF7043] focus:ring-[#FF7043]"
                    />
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={() => toast.success('Privacy settings updated')}
                >
                  Save Privacy Settings
                </Button>
              </div>

              {/* Danger Zone: Delete Account */}
              {renderDangerZone()}
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Account Permanently"
          description="Type 'DELETE' below to confirm you want to wipe your account and data."
        >
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-rose-900 dark:text-rose-200">
                  This action is permanent and irreversible
                </p>
                <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
                  All your active ideas, team workspaces, task assignments, and reputation points will be erased immediately.
                </p>
              </div>
            </div>

            <Input
              label="Type DELETE to confirm"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="DELETE"
            />
            <div className="flex justify-end gap-2.5 pt-2">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button
                variant="danger-solid"
                disabled={deleteConfirmation !== 'DELETE'}
                onClick={handleDeleteAccount}
                icon={Trash2}
              >
                Permanently Delete Account
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
