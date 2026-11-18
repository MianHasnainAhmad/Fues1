import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Key,
  Server,
  Lock,
  Database,
  CheckCircle,
  Bell,
  Cpu,
  Save,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { Button } from '../../../components/common/Button';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import toast from 'react-hot-toast';

export const AdminSettingsPage = () => {
  const { adminUser, role } = useAdminAuth();

  // Settings form states
  const [sessionTimeoutHours, setSessionTimeoutHours] = useState('24');
  const [twoFactorRequired, setTwoFactorRequired] = useState(true);
  const [pgVectorIndexAutoRefresh, setPgVectorIndexAutoRefresh] = useState(true);
  const [emailAlertsOnReports, setEmailAlertsOnReports] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    toast.success('Admin platform configuration updated');
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-200">
      <AdminPageHeader
        title="Admin Platform Settings"
        description="Configure control plane security policies, session timeouts, PostgreSQL RAG index intervals, and backend connection endpoints."
        breadcrumbs={[{ label: 'Settings' }]}
      />

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Platform Architecture & Backend Integration Display */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-[#FF7043]" />
            <div>
              <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
                Backend & Service Infrastructure
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A8A8A2]">
                Django REST Framework & PostgreSQL connection parameters
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-1">
              <span className="text-[#71717A] block">Target DRF API Base URL</span>
              <p className="font-mono font-bold text-[#171717] dark:text-[#F5F5F0]">
                http://localhost:8000/api
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-1">
              <span className="text-[#71717A] block">Vector Database</span>
              <p className="font-mono font-bold text-purple-600 dark:text-purple-400">
                PostgreSQL 16 + pgvector (1536 dim)
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-1">
              <span className="text-[#71717A] block">Authentication Pipeline</span>
              <p className="font-mono font-bold text-[#171717] dark:text-[#F5F5F0]">
                django-rest-framework-simplejwt
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-1">
              <span className="text-[#71717A] block">AI Embedding Model</span>
              <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                OpenAI text-embedding-3-small
              </p>
            </div>
          </div>
        </div>

        {/* Security & Access Policies */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
                Security Policies & Session Inactivity
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A8A8A2]">
                Define timeout bounds and authorization safeguards
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-[#F0EFEA] dark:border-[#22221F]">
              <div className="space-y-0.5">
                <span className="font-bold text-[#171717] dark:text-[#F5F5F0] block">
                  Enforce Two-Factor Authentication (2FA)
                </span>
                <span className="text-[#71717A]">
                  Mandate TOTP authenticator app tokens for all admin roles.
                </span>
              </div>
              <input
                type="checkbox"
                checked={twoFactorRequired}
                onChange={(e) => setTwoFactorRequired(e.target.checked)}
                className="w-4 h-4 rounded text-[#171717]"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F0EFEA] dark:border-[#22221F]">
              <div className="space-y-0.5">
                <span className="font-bold text-[#171717] dark:text-[#F5F5F0] block">
                  Admin Session Token Expiry
                </span>
                <span className="text-[#71717A]">
                  Force re-authentication after inactivity window.
                </span>
              </div>
              <select
                value={sessionTimeoutHours}
                onChange={(e) => setSessionTimeoutHours(e.target.value)}
                className="bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-1.5 font-semibold text-xs text-[#171717] dark:text-[#F5F5F0]"
              >
                <option value="12">12 Hours</option>
                <option value="24">24 Hours</option>
                <option value="72">72 Hours</option>
                <option value="720">30 Days</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F0EFEA] dark:border-[#22221F]">
              <div className="space-y-0.5">
                <span className="font-bold text-[#171717] dark:text-[#F5F5F0] block">
                  Instant Email Dispatch on High-Priority Reports
                </span>
                <span className="text-[#71717A]">
                  Send emergency email alerts to moderators for spam attacks.
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailAlertsOnReports}
                onChange={(e) => setEmailAlertsOnReports(e.target.checked)}
                className="w-4 h-4 rounded text-[#171717]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="md" icon={Save}>
              Save Security Configuration
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
