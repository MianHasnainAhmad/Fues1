import React, { useState, useEffect } from 'react';
import { Bell, CheckCheck, Filter } from 'lucide-react';
import { NotificationItem } from '../../components/notifications/NotificationItem';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { notificationService } from '../../services/notificationService';
import toast from 'react-hot-toast';

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'requests' | 'activity' | 'tasks'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationService.getNotifications();
      setNotifications(res);
    } catch {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    const updated = await notificationService.markAsRead(id);
    setNotifications(updated);
    toast.success('Marked as read');
  };

  const handleMarkAllRead = async () => {
    const updated = await notificationService.markAllAsRead();
    setNotifications(updated);
    toast.success('All notifications marked as read');
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.category === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E7E0]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FF7043] text-white">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-sm text-[#737373] mt-1">
            Stay up to date with project invitations, task assignments, and community feedback.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            icon={CheckCheck}
            onClick={handleMarkAllRead}
          >
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Notifications' },
          { id: 'requests', label: 'Collaboration Requests' },
          { id: 'activity', label: 'Idea Feedback & Likes' },
          { id: 'tasks', label: 'Tasks & Milestones' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              filter === tab.id
                ? 'bg-[#171717] text-white shadow-2xs dark:bg-white dark:text-[#171717]'
                : 'bg-white border border-[#E8E7E0] text-[#737373] hover:text-[#171717] dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="w-8 h-8 border-3 border-[#FF7043] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredNotifs.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications in this category"
          description="You're all caught up! New collaborator pings and reactions will appear here."
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifs.map((item) => (
            <NotificationItem
              key={item.id}
              notification={item}
              onMarkRead={handleMarkAsRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};
