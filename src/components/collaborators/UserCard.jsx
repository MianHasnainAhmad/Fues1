import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { notificationService } from '../../services/notificationService';
import toast from 'react-hot-toast';

export const UserCard = ({ user }) => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [message, setMessage] = useState('');
  const [connectionType, setConnectionType] = useState(user.connectionTypes?.[0] || 'Skill contribution');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasConnected, setHasConnected] = useState(false);

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please include a message with your connection invite.');
      return;
    }
    try {
      setIsSubmitting(true);
      await notificationService.sendCollaborationRequest({
        recipient: user,
        connectionType,
        message,
      });
      toast.success(`Connection invitation sent to ${user.name}!`);
      setHasConnected(true);
      setShowConnectModal(false);
      setMessage('');
    } catch {
      toast.error('Failed to send connection invitation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E8E7E0] p-5 sm:p-6 shadow-sm hover-lift flex flex-col justify-between transition-all">
        <div>
          {/* Top Info */}
          <div className="flex items-start gap-4 mb-4">
            <Link to={`/profile/${user.id}`} className="hover:opacity-85 transition-opacity">
              <Avatar src={user.avatar} name={user.name} size="xl" status="online" />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <Link to={`/profile/${user.id}`} className="hover:text-[#FF7043] transition-colors">
                  <h3 className="text-base font-bold text-[#171717] truncate">{user.name}</h3>
                </Link>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFF0EB] text-[#FF7043] border border-[#FFD8CC]">
                  ★ {user.reputationScore}
                </span>
              </div>
              <p className="text-xs font-medium text-[#737373] truncate mt-0.5">{user.title}</p>
              {user.location && (
                <p className="text-xs text-[#A3A3A3] flex items-center gap-1 mt-1 truncate">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {user.location}
                </p>
              )}
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-[#525252] leading-relaxed line-clamp-3 mb-4">
            {user.bio}
          </p>

          {/* Skills */}
          <div className="mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] block mb-1.5">
              Top Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {user.skills?.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-0.5 rounded-lg bg-[#F8F8F5] border border-[#E8E7E0] text-[#404040] font-medium"
                >
                  {skill}
                </span>
              ))}
              {user.skills?.length > 4 && (
                <span className="text-xs px-1.5 py-0.5 rounded-lg text-[#737373]">
                  +{user.skills.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#F8F8F5] border border-[#E8E7E0] mb-5 text-center">
            <div>
              <p className="text-xs font-bold text-[#171717]">{user.collaborationsCount || 8}</p>
              <p className="text-[11px] text-[#737373]">Collaborations</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#171717]">{user.commitment?.split(' ')[0] || 'Part-time'}</p>
              <p className="text-[11px] text-[#737373]">Commitment</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#F0EFEA] flex items-center gap-2">
          {hasConnected ? (
            <Button variant="secondary" size="sm" className="flex-1" disabled icon={CheckCircle2}>
              Request Sent
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              icon={Send}
              onClick={() => setShowConnectModal(true)}
            >
              Connect
            </Button>
          )}

          <Link to={`/profile/${user.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full" icon={ArrowRight} iconPosition="right">
              Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Connect Modal */}
      <Modal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        title={`Connect with ${user.name}`}
        description="Initiate a collaboration or ask for advice on your incomplete idea."
      >
        <form onSubmit={handleConnect} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E7E0] flex items-center gap-3">
            <Avatar src={user.avatar} name={user.name} size="md" />
            <div>
              <p className="text-sm font-bold text-[#171717]">{user.name}</p>
              <p className="text-xs text-[#737373]">{user.title}</p>
            </div>
          </div>

          <Select
            label="Collaboration Intent"
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
            label="Personal Note"
            placeholder={`Hi ${user.name.split(' ')[0]}, I saw your profile and would love to collaborate on...`}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setShowConnectModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isSubmitting}
              icon={Send}
            >
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
