import React, { useState, useEffect } from 'react';
import {
  Bell,
  Send,
  Plus,
  Search,
  Eye,
  Trash2,
  Users,
  CheckCircle,
  Megaphone,
  Radio,
  Sparkles,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { AdminConfirmModal } from '../../../components/admin/common/AdminConfirmModal';
import { Button } from '../../../components/common/Button';
import { adminNotificationService } from '../../../services/adminNotificationService';
import { adminActivityLogService } from '../../../services/adminActivityLogService';
import toast from 'react-hot-toast';

export const AdminNotificationsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Composer Modal State
  const [composerOpen, setComposerOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    title: '',
    content: '',
    audience: 'All Users',
    type: 'banner',
  });

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await adminNotificationService.getAnnouncements();
      setAnnouncements(data);
    } catch {
      toast.error('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    try {
      const created = await adminNotificationService.createAnnouncement(form);
      await adminActivityLogService.logAction(
        'ANNOUNCEMENT_BROADCAST',
        `Broadcast: "${created.title}"`,
        `Dispatched ${created.type} announcement to ${created.audience}.`,
        'primary'
      );
      toast.success(`Announcement broadcast to ${form.audience}`);
      setComposerOpen(false);
      setPreviewOpen(false);
      setForm({ title: '', content: '', audience: 'All Users', type: 'banner' });
      fetchAnnouncements();
    } catch {
      toast.error('Failed to broadcast announcement');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await adminNotificationService.deleteAnnouncement(deleteTarget.id);
      await adminActivityLogService.logAction(
        'ANNOUNCEMENT_DELETED',
        `Announcement: ${deleteTarget.title}`,
        'Deleted platform broadcast.',
        'warning'
      );
      toast.success('Announcement removed');
      setDeleteTarget(null);
      fetchAnnouncements();
    } catch {
      toast.error('Failed to delete announcement');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <AdminPageHeader
        title="Notification & Announcement Hub"
        description="Broadcast system-wide notices, publish hackathon banners, configure target audiences, and audit push notification delivery telemetry."
        breadcrumbs={[{ label: 'Notifications' }]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={Megaphone}
            onClick={() => setComposerOpen(true)}
          >
            Compose Announcement
          </Button>
        }
      />

      {/* Broadcast History List */}
      <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
              Active & Scheduled Broadcasts ({announcements.length})
            </h3>
            <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] mt-0.5">
              Live announcement overlays delivered across web client sessions
            </p>
          </div>
        </div>

        <div className="divide-y divide-[#F0EFEA] dark:divide-[#22221F]">
          {announcements.map((anc) => (
            <div key={anc.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                    {anc.type}
                  </span>
                  <h4 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
                    {anc.title}
                  </h4>
                  <AdminStatusBadge status={anc.status} size="xs" />
                </div>
                <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] leading-relaxed">
                  {anc.content}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-[#A3A3A3] pt-1">
                  <span>Target: <strong className="text-[#171717] dark:text-white">{anc.audience}</strong></span>
                  <span>Dispatched: <strong>{anc.sentAt}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right text-xs font-mono">
                  <span className="text-[#71717A] block text-[10px] uppercase font-bold">Impressions</span>
                  <span className="font-bold text-[#171717] dark:text-white">{anc.viewsCount} views • {anc.clicksCount} clicks</span>
                </div>

                <button
                  onClick={() => setDeleteTarget(anc)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Composer Modal */}
      {composerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EFEA] dark:border-[#22221F]">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#FF7043]" />
                <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
                  Compose Platform Broadcast
                </h3>
              </div>
              <button
                onClick={() => setComposerOpen(false)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Announcement Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Fuse Community Sprint Kickoff"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Announcement Message</label>
                <textarea
                  rows={3}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Enter message details for platform users..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Target Audience</label>
                  <select
                    value={form.audience}
                    onChange={(e) => setForm({ ...form, audience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
                  >
                    <option value="All Users">All Registered Users</option>
                    <option value="Team Leaders">Team Leaders Only</option>
                    <option value="Founders">Idea Creators Only</option>
                    <option value="Collaborators">Active Collaborators</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Display Format</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
                  >
                    <option value="banner">Top Feed Banner</option>
                    <option value="toast">Global Interactive Toast</option>
                    <option value="modal">On-Login Priority Modal</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0EFEA] dark:border-[#22221F] flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  icon={Eye}
                  onClick={() => setPreviewOpen(true)}
                  disabled={!form.title}
                >
                  Live Preview
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" type="button" onClick={() => setComposerOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit" icon={Send}>
                    Broadcast Now
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0EFEA] dark:border-[#22221F]">
              <span className="text-xs font-mono font-bold uppercase text-[#71717A]">Preview: {form.type}</span>
              <button onClick={() => setPreviewOpen(false)} className="text-stone-400">✕</button>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">{form.title}</h4>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed pl-6">
                {form.content}
              </p>
            </div>

            <Button variant="secondary" size="xs" className="w-full" onClick={() => setPreviewOpen(false)}>
              Close Preview
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <AdminConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={`Remove Announcement "${deleteTarget?.title}"?`}
        description="The notice will be permanently revoked from active broadcast feeds."
        confirmText="Remove Broadcast"
        danger
      />
    </div>
  );
};

export default AdminNotificationsPage;
