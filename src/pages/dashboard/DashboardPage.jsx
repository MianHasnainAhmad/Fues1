import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Lightbulb,
  Users2,
  GitCommit,
  FolderKanban,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Compass,
  UserCheck,
  CheckCircle2,
  Calendar,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { IdeaCard } from '../../components/ideas/IdeaCard';
import { mockIdeas } from '../../data/mockIdeas';
import { mockUsers } from '../../data/mockUsers';
import { mockTeams } from '../../data/mockTeams';
import { mockNotifications } from '../../data/mockNotifications';

const activityChartData = [
  { month: 'Jun', contributions: 8, feedback: 4 },
  { month: 'Jul', contributions: 12, feedback: 6 },
  { month: 'Aug', contributions: 19, feedback: 9 },
  { month: 'Sep', contributions: 24, feedback: 15 },
  { month: 'Oct', contributions: 31, feedback: 21 },
  { month: 'Nov', contributions: 42, feedback: 28 },
];

export const DashboardPage = () => {
  const { user } = useAuth();
  const { accentColor } = useTheme();
  const [ideas, setIdeas] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setIdeas(mockIdeas.slice(0, 2));
    setTeams(mockTeams);
  }, []);

  const recommendedCollaborators = mockUsers.slice(0, 3);
  const activeTeam = teams[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E8E7E0]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
              Good afternoon, {user?.name?.split(' ')[0] || 'Alex'} 👋
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FFF0EB] text-[#FF7043] border border-[#FFD8CC]">
              Karma: {user?.reputationScore || 97}
            </span>
          </div>
          <p className="text-sm text-[#737373] mt-1">
            You have 2 pending collaboration requests and 1 active sprint milestone this week.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/ideas/create">
            <Button variant="primary" size="md" icon={PlusCircle}>
              Share Idea
            </Button>
          </Link>
          <Link to="/ideas">
            <Button variant="outline" size="md" icon={Compass}>
              Explore Feed
            </Button>
          </Link>
          <Link to="/collaborators">
            <Button variant="secondary" size="md" icon={Users2}>
              Find Talent
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Completion Card (if not 100%) */}
      <div className="bg-gradient-to-r from-[#FFFBF9] to-white dark:from-[#241712] dark:to-[#1A1A19] rounded-2xl border border-[#FFD8CC] dark:border-[#3E231C] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] dark:bg-[#FF7043]/15 text-[#FF7043] flex items-center justify-center shrink-0 border border-[#FFD8CC] dark:border-[#FF7043]/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">Profile Strength: 85%</h4>
              <span className="text-xs text-[#737373] dark:text-[#8C8C87]">(Almost Complete)</span>
            </div>
            <p className="text-xs text-[#525252] dark:text-[#A8A8A2] mt-0.5">
              Add your GitHub/portfolio link to boost your AI collaborator match score by +15%.
            </p>
          </div>
        </div>
        <Link to="/my-profile" className="shrink-0">
          <Button variant="subtle" size="sm" icon={ArrowRight} iconPosition="right">
            Complete Profile
          </Button>
        </Link>
      </div>

      {/* Top 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Ideas Shared"
          value={user?.ideasSharedCount || 3}
          change="1 this month"
          icon={Lightbulb}
          color="orange"
          subtext="2 published, 1 in draft"
        />
        <StatCard
          title="Collaborations"
          value={user?.collaborationsCount || 9}
          change="3 active"
          icon={Users2}
          color="lavender"
          subtext="Across 4 categories"
        />
        <StatCard
          title="Contributions"
          value={user?.contributionsCount || 34}
          change="+12% velocity"
          icon={GitCommit}
          color="green"
          subtext="Tasks & code reviews"
        />
        <StatCard
          title="Teams Joined"
          value={user?.teamsJoinedCount || 2}
          change="1 as founder"
          icon={FolderKanban}
          color="blue"
          subtext="Kinetic & BloomGrid"
        />
      </div>

      {/* Grid: Activity Momentum Chart & Active Sprint Milestone */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity & Contribution Momentum Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E7E0] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#171717]">Contribution Momentum</h3>
              <p className="text-xs text-[#737373]">Peer reviews, tasks, and code commits over the past 6 months</p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> High Velocity
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorContrib" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={accentColor} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={accentColor} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#A3A3A3" fontSize={11} tickLine={false} />
                <YAxis stroke="#A3A3A3" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#171717',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="contributions"
                  stroke={accentColor}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorContrib)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Team Sprint & Upcoming Milestones */}
        <div className="bg-white rounded-2xl border border-[#E8E7E0] p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7043]">
                Current Sprint
              </span>
              <Link to="/teams/team-1" className="text-xs text-[#737373] hover:text-[#171717] dark:hover:text-white font-semibold">
                Workspace →
              </Link>
            </div>

            <h4 className="text-base font-bold text-[#171717]">{activeTeam?.name}</h4>
            <p className="text-xs text-[#737373] mt-0.5 line-clamp-1">{activeTeam?.tagline}</p>

            <div className="mt-4 p-3 rounded-xl bg-[#F8F8F5] border border-[#E8E7E0] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#525252] font-semibold">Stage Progress:</span>
                <span className="font-bold text-[#FF7043]">{activeTeam?.progressPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-[#E8E7E0] dark:bg-[#2C2C28] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF7043] rounded-full"
                  style={{ width: `${activeTeam?.progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] block">
                Next Milestone Target
              </span>
              <div className="flex items-start gap-2.5 text-xs text-[#404040]">
                <Clock className="w-4 h-4 text-[#FF7043] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#171717]">Finalize Audio Opus Streaming</p>
                  <p className="text-[#737373] text-[11px]">Due Nov 20 (in 5 days)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F0EFEA] mt-4">
            <Link to="/teams/team-1">
              <Button variant="outline" size="sm" className="w-full">
                View Kanban Board
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Collaborators & Ideas Matching You */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Ideas based on your skills */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#171717]">Ideas Matching Your Skills</h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F3EFFF] text-[#6C5CE7]">
                AI Suggested
              </span>
            </div>
            <Link to="/ideas" className="text-xs font-semibold text-[#FF7043] hover:underline">
              View Feed
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>

        {/* Recommended Collaborators Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#171717]">Builders to Know</h3>
            <Link to="/collaborators" className="text-xs font-semibold text-[#FF7043] hover:underline">
              Discover All
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E7E0] divide-y divide-[#F0EFEA] shadow-sm">
            {recommendedCollaborators.map((user) => (
              <div key={user.id} className="p-4 flex items-start gap-3 hover:bg-[#F8F8F5] dark:hover:bg-[#262624] transition-colors">
                <Link to={`/profile/${user.id}`}>
                  <Avatar src={user.avatar} name={user.name} size="md" status="online" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <Link to={`/profile/${user.id}`} className="hover:text-[#FF7043] transition-colors">
                      <p className="text-sm font-bold text-[#171717] truncate">{user.name}</p>
                    </Link>
                    <span className="text-[10px] font-mono font-bold text-[#FF7043]">
                      ★{user.reputationScore}
                    </span>
                  </div>
                  <p className="text-xs text-[#737373] truncate">{user.title}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {user.skills.slice(0, 2).map((s, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#F2F1EC] dark:bg-[#222220] text-[#525252] dark:text-[#A8A8A2] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick AI Companion Widget link */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#171717] to-[#262626] text-white shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF7043]">
              <Sparkles className="w-4 h-4" />
              <span>AI Similarity & RAG Companion</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Have an unfinished concept in your notes? Run it through our semantic similarity engine to discover who else is working on it.
            </p>
            <Link to="/ai-companion" className="block pt-1">
              <Button variant="primary" size="sm" className="w-full">
                Test Idea with AI
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
