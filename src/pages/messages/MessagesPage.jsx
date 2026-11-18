import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Search,
  Send,
  MoreVertical,
  Check,
  CheckCheck,
  Sparkles,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  Circle,
  FolderKanban,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { messageService } from '../../services/messageService';
import toast from 'react-hot-toast';

export const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState('');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, activeId]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const res = await messageService.getConversations();
      setConversations(res);
      if (res.length > 0 && !activeId) {
        setActiveId(res[0].id);
      }
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const activeConv = conversations.find((c) => c.id === activeId);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeId) return;
    try {
      const text = inputText;
      setInputText('');
      await messageService.sendMessage(activeId, text);
      const updated = await messageService.getConversations();
      setConversations(updated);
    } catch {
      toast.error('Failed to send message');
    }
  };

  const filteredConvs = conversations.filter(
    (c) =>
      c.user.name.toLowerCase().includes(search.toLowerCase()) ||
      c.projectContext.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-[#171716] rounded-2xl sm:rounded-3xl border border-[#E8E7E0] dark:border-[#262624] overflow-hidden shadow-sm h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] min-h-[500px] flex flex-col md:flex-row transition-colors">
      {/* =========================================================================
          Left Sidebar: Conversations List
         ========================================================================= */}
      <div className={`w-full md:w-84 border-r border-[#E8E7E0] dark:border-[#262624] flex-col h-full bg-[#FAF9F6] dark:bg-[#141413] shrink-0 ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#E8E7E0] dark:border-[#262624] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF7043]/10 dark:bg-[#FF7043]/20 flex items-center justify-center text-[#FF7043]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
                Messages
              </h2>
            </div>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFF0EB] dark:bg-[#FF7043]/20 text-[#FF7043] border border-[#FFD8CC] dark:border-[#FF7043]/30">
              {conversations.length} Active
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#737373] dark:text-[#8C8C87]" />
            <input
              type="text"
              placeholder="Search chats or projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-[#1E1E1C] border border-[#E8E7E0] dark:border-[#2C2C28] rounded-xl pl-9 pr-3 py-2 text-xs text-[#171717] dark:text-[#F5F5F0] placeholder:text-[#A3A3A3] dark:placeholder:text-[#666661] focus:outline-none focus:ring-2 focus:ring-[#FF7043]/30 focus:border-[#FF7043] transition-all"
            />
          </div>
        </div>

        {/* Conversation Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#F0EFEA] dark:divide-[#20201D] p-2 space-y-1">
          {filteredConvs.map((conv) => {
            const isSelected = conv.id === activeId;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveId(conv.id);
                  setShowMobileChat(true);
                }}
                className={`p-3 rounded-2xl flex items-start gap-3 transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-white dark:bg-[#222220] shadow-sm border border-[#E8E7E0] dark:border-[#33332E]'
                    : 'hover:bg-white/70 dark:hover:bg-[#1B1B19] border border-transparent'
                }`}
              >
                {/* Active Indicator Accent Line */}
                {isSelected && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#FF7043] rounded-r-full" />
                )}

                <div className="relative shrink-0">
                  <Avatar
                    src={conv.user.avatar}
                    name={conv.user.name}
                    size="md"
                    status={conv.user.status}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0] truncate">
                      {conv.user.name}
                    </h4>
                    <span className="text-[10px] text-[#737373] dark:text-[#8C8C87] shrink-0 font-medium">
                      {conv.lastMessageTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-[#FF7043] dark:text-[#FF8A65] font-semibold truncate mb-1">
                    <span className="truncate">{conv.projectContext}</span>
                  </div>

                  <p className="text-xs text-[#525252] dark:text-[#A8A8A2] line-clamp-1 leading-snug">
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          Right Side: Active Chat Window
         ========================================================================= */}
      {activeConv ? (
        <div className={`flex-1 flex-col h-full bg-white dark:bg-[#171716] min-w-0 ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
          {/* Chat Header */}
          <div className="px-4 sm:px-5 py-3.5 border-b border-[#E8E7E0] dark:border-[#262624] flex items-center justify-between gap-3 bg-white/80 dark:bg-[#171716]/90 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              {/* Back to chat list button on mobile */}
              <button
                type="button"
                onClick={() => setShowMobileChat(false)}
                className="md:hidden p-1.5 -ml-1 rounded-xl text-[#737373] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F1EC] dark:hover:bg-[#262624] transition-colors shrink-0"
                title="Back to conversations"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <Avatar
                src={activeConv.user.avatar}
                name={activeConv.user.name}
                size="md"
                status={activeConv.user.status}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0] truncate">
                    {activeConv.user.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {activeConv.user.status === 'online' ? 'Active Now' : 'Offline'}
                  </span>
                </div>
                <p className="text-xs text-[#737373] dark:text-[#8C8C87] truncate">
                  Sprint:{' '}
                  <span className="font-semibold text-[#FF7043] dark:text-[#FF8A65]">
                    {activeConv.projectContext}
                  </span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Link to="/teams/team-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:inline-flex text-xs"
                  icon={FolderKanban}
                >
                  Workspace
                </Button>
              </Link>
              <Link to={`/profile/${activeConv.user.id}`}>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-xs">
                  Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Messages Stream Canvas */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F8F8F5]/60 dark:bg-[#121211] transition-colors">
            {/* Timestamp divider */}
            <div className="flex items-center justify-center my-2">
              <span className="px-3 py-1 rounded-full bg-[#E8E7E0]/70 dark:bg-[#20201D] text-[11px] font-medium text-[#737373] dark:text-[#8C8C87] border border-[#DCDAD2] dark:border-[#2C2C28]">
                Today — Project Collaboration Thread
              </span>
            </div>

            {activeConv.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} group`}
              >
                <div className="flex items-end gap-2 max-w-[85%] sm:max-w-md">
                  {!msg.isMe && (
                    <Avatar
                      src={activeConv.user.avatar}
                      name={activeConv.user.name}
                      size="xs"
                      className="shrink-0 mb-1"
                    />
                  )}

                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs transition-colors ${
                      msg.isMe
                        ? 'bg-[#FF7043] text-white rounded-br-xs font-medium shadow-orange-500/10'
                        : 'bg-white dark:bg-[#20201D] border border-[#E8E7E0] dark:border-[#2E2E29] text-[#171717] dark:text-[#EDEDE8] rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Bubble Timestamp & Status */}
                <div
                  className={`flex items-center gap-1 text-[10px] text-[#A3A3A3] dark:text-[#6E6E69] mt-1 px-1 ${
                    msg.isMe ? 'pr-1' : 'pl-7'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.isMe && (
                    <CheckCheck className="w-3.5 h-3.5 text-[#FF7043] dark:text-[#FF8A65]" />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 sm:p-4 border-t border-[#E8E7E0] dark:border-[#262624] bg-white dark:bg-[#171716] flex items-center gap-2.5 shrink-0"
          >
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                placeholder={`Reply to ${activeConv.user.name.split(' ')[0]}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full bg-[#F8F8F5] dark:bg-[#1E1E1C] border border-[#E8E7E0] dark:border-[#2E2E28] rounded-2xl pl-4 pr-10 py-3 text-xs sm:text-sm text-[#171717] dark:text-[#F5F5F0] placeholder:text-[#A3A3A3] dark:placeholder:text-[#6E6E69] focus:outline-none focus:ring-2 focus:ring-[#FF7043]/30 focus:border-[#FF7043] transition-all"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Send}
              disabled={!inputText.trim()}
              className="rounded-2xl px-5 py-3 h-auto"
            >
              Send
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#737373] dark:text-[#8C8C87] space-y-3 bg-[#F8F8F5]/30 dark:bg-[#121211]">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF0EB] dark:bg-[#FF7043]/15 text-[#FF7043] flex items-center justify-center">
            <MessageSquare className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
            No Chat Selected
          </h3>
          <p className="text-xs max-w-sm">
            Choose a conversation from the left to start coordinating with your team.
          </p>
        </div>
      )}
    </div>
  );
};
