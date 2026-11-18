import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Send,
  Star,
  CheckCircle2,
  FolderKanban,
  Lightbulb,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { userService } from '../../services/userService';
import { notificationService } from '../../services/notificationService';
import toast from 'react-hot-toast';

export const UserProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectionType, setConnectionType] = useState('Skill contribution');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadProfile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await userService.getUserById(id);
      setProfile(res);
    } catch {
      toast.error('Profile not found');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      setIsSubmitting(true);
      await notificationService.sendCollaborationRequest({
        recipient: profile,
        connectionType,
        message,
      });
      toast.success(`Collaboration invitation sent to ${profile.name}!`);
      setShowConnectModal(false);
      setMessage('');
    } catch {
      toast.error('Failed to send invite');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="w-8 h-8 border-3 border-[#FF7043] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-bold">User profile not found</h2>
        <Link to="/collaborators">
          <Button variant="primary">Browse Collaborators</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-200">
      <Link
        to="/collaborators"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#737373] hover:text-[#171717] dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to collaborators
      </Link>

      {/* Cover Header and Avatar Card */}
      <div className="bg-white rounded-3xl border border-[#E8E7E0] overflow-hidden shadow-sm">
        {/* Cover Image */}
        <div
          className="h-44 sm:h-56 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${profile.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Profile Info Row */}
        <div className="p-6 sm:p-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <Avatar
              src={profile.avatar}
              name={profile.name}
              size="2xl"
              status="online"
              className="ring-4 ring-white shadow-md bg-white"
            />

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                icon={Send}
                onClick={() => setShowConnectModal(true)}
              >
                Propose Collaboration
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">{profile.name}</h1>
                <p className="text-sm font-semibold text-[#737373]">{profile.handle}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FFF0EB] text-[#FF7043] border border-[#FFD8CC]">
                  ★ Karma: {profile.reputationScore}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                  {profile.availability || 'Available'}
                </span>
              </div>
            </div>

            <p className="text-base text-[#171717] font-semibold">{profile.title}</p>
            <p className="text-sm text-[#525252] leading-relaxed max-w-2xl">{profile.bio}</p>

            {profile.location && (
              <p className="text-xs text-[#737373] flex items-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5" />
                {profile.location}
              </p>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#F0EFEA] text-center">
            <div className="p-3 rounded-2xl bg-[#F8F8F5]">
              <p className="text-lg font-extrabold text-[#171717]">{profile.ideasSharedCount || 4}</p>
              <p className="text-xs text-[#737373]">Ideas Shared</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F8F8F5]">
              <p className="text-lg font-extrabold text-[#171717]">{profile.collaborationsCount || 12}</p>
              <p className="text-xs text-[#737373]">Collaborations</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F8F8F5]">
              <p className="text-lg font-extrabold text-[#171717]">{profile.contributionsCount || 28}</p>
              <p className="text-xs text-[#737373]">Contributions</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F8F8F5]">
              <p className="text-lg font-extrabold text-[#171717]">{profile.teamsJoinedCount || 3}</p>
              <p className="text-xs text-[#737373]">Teams Joined</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills & Interests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
            Verified Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills?.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-[#F8F8F5] border border-[#E8E7E0] text-xs font-semibold text-[#171717]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
            Passions & Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests?.map((interest, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-[#FFF0EB] border border-[#FFD8CC] text-xs font-semibold text-[#FF7043]"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Collaboration History & Peer Reviews */}
      <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-[#171717]">Peer Reviews & Reputation</h3>
          <p className="text-xs text-[#737373] mt-0.5">Feedback left by project owners and collaborators.</p>
        </div>

        <div className="space-y-4">
          {profile.reviews && profile.reviews.length > 0 ? (
            profile.reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-[#F8F8F5] border border-[#E8E7E0] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Avatar src={rev.reviewerAvatar} name={rev.reviewerName} size="sm" />
                    <div>
                      <p className="text-xs font-bold text-[#171717]">{rev.reviewerName}</p>
                      <p className="text-[10px] text-[#737373]">{rev.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#404040] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-2xl bg-[#F8F8F5] text-xs text-[#737373] text-center">
              No public reviews recorded yet.
            </div>
          )}
        </div>
      </div>

      {/* Connect Modal */}
      <Modal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        title={`Collaborate with ${profile.name}`}
        description="Share what you are working on and how you can create together."
      >
        <form onSubmit={handleConnect} className="space-y-4">
          <Select
            label="Collaboration Mode"
            value={connectionType}
            onChange={(e) => setConnectionType(e.target.value)}
            options={[
              'Skill contribution',
              'Co-founder',
              'Micro-help (Feedback / Code review)',
              'Accountability partner',
              'Community support',
            ]}
          />

          <Textarea
            label="Message"
            placeholder="Share context on your project and why their background is a fit..."
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConnectModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              icon={Send}
            >
              Send Invite
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
