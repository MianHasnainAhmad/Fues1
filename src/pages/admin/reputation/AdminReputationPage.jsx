import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Star,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  Trash2,
  User,
  Heart,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminStatCard } from '../../../components/admin/common/AdminStatCard';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { AdminConfirmModal } from '../../../components/admin/common/AdminConfirmModal';
import { Button } from '../../../components/common/Button';
import { adminCategoryService } from '../../../services/adminCategoryService';
import { adminActivityLogService } from '../../../services/adminActivityLogService';
import { mockPlatformUsers } from '../../../data/mockAdminData';
import toast from 'react-hot-toast';

export const AdminReputationPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'flag' | 'verify'

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await adminCategoryService.getReputationReviews();
      setReviews(data);
    } catch {
      toast.error('Failed to load peer reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleActionConfirm = async () => {
    if (!selectedReview || !modalAction) return;
    try {
      const newStatus = modalAction === 'flag' ? 'flagged' : 'verified';
      await adminCategoryService.updateReviewStatus(selectedReview.id, newStatus);
      await adminActivityLogService.logAction(
        newStatus === 'flagged' ? 'REVIEW_FLAGGED' : 'REVIEW_VERIFIED',
        `Review by ${selectedReview.reviewer.name} on ${selectedReview.reviewee.name}`,
        `Updated peer review status to ${newStatus}.`,
        newStatus === 'flagged' ? 'warning' : 'success'
      );
      toast.success(`Review status updated to ${newStatus}`);
      setSelectedReview(null);
      setModalAction(null);
      fetchReviews();
    } catch {
      toast.error('Action failed');
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <AdminPageHeader
        title="Reputation & Trust Management"
        description="Audit peer reviews, detect retaliatory review disputes, review trust score distributions, and maintain high collaborative integrity."
        breadcrumbs={[{ label: 'Reputation' }]}
      />

      {/* Trust & Reputation Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          title="Average Trust Score"
          value="94.2"
          change="+1.8 pts"
          changeType="positive"
          icon={Award}
          caption="Calculated from peer reviews"
        />
        <AdminStatCard
          title="Verified Reviews"
          value="412"
          change="98.5% authentic"
          changeType="positive"
          icon={CheckCircle}
          caption="Completed collaboration reviews"
        />
        <AdminStatCard
          title="Flagged Disputes"
          value="1"
          change="Requires Review"
          changeType="negative"
          icon={AlertTriangle}
          caption="Flagged as retaliatory or spam"
        />
        <AdminStatCard
          title="Top Contributors"
          value="86"
          change="Score >= 95"
          changeType="positive"
          icon={Star}
          caption="Eligible for micro-grant mentors"
        />
      </div>

      {/* Peer Review Audit Table */}
      <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
              Peer Reviews & Dispute Queue
            </h3>
            <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] mt-0.5">
              Transparent feedback submitted following sprint completion
            </p>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
          >
            <option value="all">All Review Statuses</option>
            <option value="verified">Verified Reviews</option>
            <option value="flagged">Flagged / Disputes</option>
          </select>
        </div>

        <div className="divide-y divide-[#F0EFEA] dark:divide-[#22221F]">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="py-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0]">
                    {rev.reviewer.name}
                  </span>
                  <span className="text-stone-400 text-xs">→</span>
                  <span className="text-xs font-bold text-[#FF7043]">
                    {rev.reviewee.name}
                  </span>
                  <span className="text-xs text-[#71717A] ml-2">({rev.collaborationProject})</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{rev.rating}/5</span>
                  </div>
                  <AdminStatusBadge status={rev.status} size="xs" />
                </div>
              </div>

              <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] italic p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                "{rev.comment}"
              </p>

              <div className="flex items-center justify-between text-[11px] text-[#A3A3A3] pt-1">
                <span>Submitted {rev.date}</span>
                <div className="flex items-center gap-2">
                  {rev.status === 'flagged' ? (
                    <Button
                      variant="secondary"
                      size="xs"
                      icon={CheckCircle}
                      onClick={() => {
                        setSelectedReview(rev);
                        setModalAction('verify');
                      }}
                    >
                      Clear Flag & Verify
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="xs"
                      icon={AlertTriangle}
                      className="text-amber-600 hover:text-amber-700"
                      onClick={() => {
                        setSelectedReview(rev);
                        setModalAction('flag');
                      }}
                    >
                      Flag as Suspicious
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AdminConfirmModal
        isOpen={!!modalAction}
        onClose={() => setModalAction(null)}
        onConfirm={handleActionConfirm}
        title={
          modalAction === 'flag'
            ? 'Flag Review as Suspicious Dispute?'
            : 'Clear Flag and Verify Review?'
        }
        description={
          modalAction === 'flag'
            ? 'The review rating will be temporarily excluded from the creators trust score while investigated.'
            : 'The review will be restored to verified standing.'
        }
        confirmText={modalAction === 'flag' ? 'Flag Review' : 'Verify Review'}
        danger={modalAction === 'flag'}
      />
    </div>
  );
};

export default AdminReputationPage;
