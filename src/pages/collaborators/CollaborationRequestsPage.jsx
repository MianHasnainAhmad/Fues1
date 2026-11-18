import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Check,
  X,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';
import { notificationService } from '../../services/notificationService';
import toast from 'react-hot-toast';

export const CollaborationRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming' | 'sent'
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await notificationService.getRequests();
      setRequests(res);
    } catch {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (id, status) => {
    try {
      await notificationService.respondToRequest(id, status);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      toast.success(
        status === 'accepted'
          ? 'Collaboration request accepted! Welcome them to the team.'
          : status === 'rejected'
          ? 'Request declined.'
          : 'Request cancelled.'
      );
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest(null);
      }
    } catch {
      toast.error('Failed to update request');
    }
  };

  const incomingList = requests.filter((r) => r.direction === 'incoming');
  const sentList = requests.filter((r) => r.direction === 'sent');
  const displayList = activeTab === 'incoming' ? incomingList : sentList;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return <Badge variant="green" size="sm">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="default" size="sm">Declined</Badge>;
      case 'cancelled':
        return <Badge variant="default" size="sm">Cancelled</Badge>;
      default:
        return <Badge variant="amber" size="sm">Pending Review</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E7E0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            Collaboration Requests
          </h1>
          <p className="text-sm text-[#737373] mt-1">
            Review incoming applications to join your projects, or track invitations you've sent.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-white border border-[#E8E7E0] p-1 shadow-2xs">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'incoming'
                ? 'bg-[#FF7043] text-white shadow-xs'
                : 'text-[#737373] hover:text-[#171717] dark:hover:text-white'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Incoming ({incomingList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'sent'
                ? 'bg-[#FF7043] text-white shadow-xs'
                : 'text-[#737373] hover:text-[#171717] dark:hover:text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Sent ({sentList.length})</span>
          </button>
        </div>
      </div>

      {/* Requests Listing */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="w-8 h-8 border-3 border-[#FF7043] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : displayList.length === 0 ? (
        <EmptyState
          icon={activeTab === 'incoming' ? Inbox : Send}
          title={activeTab === 'incoming' ? 'No incoming collaboration requests' : 'You haven\'t sent any requests yet'}
          description={
            activeTab === 'incoming'
              ? 'Share incomplete ideas on the feed to invite interested co-founders and contributors.'
              : 'Explore the ideas feed or discover collaborators to send your first partnership invite.'
          }
          actionLabel="Explore Feed"
          onAction={() => window.location.assign('/ideas')}
        />
      ) : (
        <div className="space-y-4">
          {displayList.map((req) => {
            const userTarget = req.direction === 'incoming' ? req.sender : req.recipient;
            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-[#E8E7E0] p-5 sm:p-6 shadow-sm hover-lift flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all"
              >
                {/* User & Project Context */}
                <div className="flex items-start gap-4">
                  <Avatar
                    src={userTarget?.avatar}
                    name={userTarget?.name || 'User'}
                    size="lg"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-[#171717]">{userTarget?.name}</h3>
                      {getStatusBadge(req.status)}
                      <span className="text-xs text-[#737373]">
                        {req.createdAt || 'Recently'}
                      </span>
                    </div>

                    <p className="text-xs text-[#737373] font-medium">{userTarget?.title}</p>

                    <div className="pt-1 flex items-center gap-2 text-xs">
                      <span className="text-[#A3A3A3]">Project:</span>
                      <span className="font-semibold text-[#171717]">{req.ideaTitle}</span>
                      <span className="text-[#A3A3A3]">•</span>
                      <span className="text-[#FF7043] font-medium">{req.connectionType}</span>
                    </div>

                    <p className="text-sm text-[#525252] line-clamp-2 pt-1 max-w-xl">
                      "{req.message}"
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Eye}
                    onClick={() => setSelectedRequest(req)}
                  >
                    Details
                  </Button>

                  {req.direction === 'incoming' && req.status === 'pending' && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={X}
                        onClick={() => handleRespond(req.id, 'rejected')}
                      >
                        Decline
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Check}
                        onClick={() => handleRespond(req.id, 'accepted')}
                      >
                        Accept
                      </Button>
                    </>
                  )}

                  {req.direction === 'sent' && req.status === 'pending' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleRespond(req.id, 'cancelled')}
                    >
                      Cancel Request
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title="Collaboration Request Details"
          description={`Concerning ${selectedRequest.ideaTitle}`}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F8F8F5] border border-[#E8E7E0] flex items-center gap-3">
              <Avatar
                src={
                  selectedRequest.direction === 'incoming'
                    ? selectedRequest.sender?.avatar
                    : selectedRequest.recipient?.avatar
                }
                name={
                  selectedRequest.direction === 'incoming'
                    ? selectedRequest.sender?.name
                    : selectedRequest.recipient?.name
                }
                size="md"
              />
              <div>
                <p className="text-sm font-bold text-[#171717]">
                  {selectedRequest.direction === 'incoming'
                    ? selectedRequest.sender?.name
                    : selectedRequest.recipient?.name}
                </p>
                <p className="text-xs text-[#737373]">
                  {selectedRequest.direction === 'incoming' ? 'Applicant' : 'Recipient'}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#F0EFEA]">
                <span className="text-[#737373]">Intent Mode:</span>
                <span className="font-semibold text-[#171717]">{selectedRequest.connectionType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0EFEA]">
                <span className="text-[#737373]">Proposed Commitment:</span>
                <span className="font-semibold text-[#171717]">{selectedRequest.commitmentProposed || 'Casual'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0EFEA]">
                <span className="text-[#737373]">Status:</span>
                <span className="font-semibold uppercase">{selectedRequest.status}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-[#737373] uppercase tracking-wider block mb-1">
                Pitch Note
              </span>
              <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E7E0] text-sm text-[#404040] leading-relaxed">
                {selectedRequest.message}
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </Button>
              {selectedRequest.direction === 'incoming' && selectedRequest.status === 'pending' && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleRespond(selectedRequest.id, 'accepted')}
                >
                  Accept & Add to Team
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
