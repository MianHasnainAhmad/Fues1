import React from 'react';
import { Link } from 'react-router-dom';
import { Check, UserPlus, Heart, MessageSquare, CheckCircle, Flag, ArrowUpRight } from 'lucide-react';
import { Avatar } from '../common/Avatar';

export const NotificationItem = ({ notification, onMarkRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'collaboration_request':
        return <UserPlus className="w-3.5 h-3.5 text-[#FF7043]" />;
      case 'request_accepted':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />;
      case 'idea_reaction':
        return <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />;
      case 'idea_comment':
        return <MessageSquare className="w-3.5 h-3.5 text-blue-500" />;
      case 'task_assigned':
      case 'milestone_updated':
        return <Flag className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <Check className="w-3.5 h-3.5 text-stone-500" />;
    }
  };

  return (
    <div
      className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
        notification.read
          ? 'bg-white border-[#E8E7E0] opacity-80'
          : 'bg-[#FFFBF9] border-[#FFD8CC] shadow-xs'
      }`}
    >
      <div className="relative shrink-0">
        <Avatar
          src={notification.sender?.avatar}
          name={notification.sender?.name || 'Fuse'}
          size="md"
        />
        <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white border border-[#E8E7E0] shadow-xs">
          {getIcon()}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="text-sm font-semibold text-[#171717] truncate">{notification.title}</h4>
          <span className="text-xs text-[#737373] shrink-0">{notification.time}</span>
        </div>
        <p className="text-xs sm:text-sm text-[#525252] mt-0.5 leading-relaxed">{notification.message}</p>

        <div className="flex items-center gap-3 mt-2.5">
          {notification.actionUrl && (
            <Link
              to={notification.actionUrl}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF7043] hover:text-[#F4511E] transition-colors"
            >
              View Details
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          )}

          {!notification.read && onMarkRead && (
            <button
              onClick={() => onMarkRead(notification.id)}
              className="text-xs text-[#737373] hover:text-[#171717] dark:hover:text-white font-medium transition-colors cursor-pointer"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
