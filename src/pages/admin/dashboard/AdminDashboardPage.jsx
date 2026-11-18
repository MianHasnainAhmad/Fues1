import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Lightbulb,
  Handshake,
  Users2,
  ShieldAlert,
  TrendingUp,
  Cpu,
  Plus,
  ArrowRight,
  ExternalLink,
  Download,
  AlertTriangle,
  Clock,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminStatCard } from '../../../components/admin/common/AdminStatCard';
import { AdminDateRangePicker } from '../../../components/admin/common/AdminDateRangePicker';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { Button } from '../../../components/common/Button';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { useTheme } from '../../../context/ThemeContext';
import {
  mockAdminAnalytics,
  mockPlatformUsers,
  mockAdminIdeas,
  mockModerationReports,
  mockAdminActivityLogs,
} from '../../../data/mockAdminData';
import { adminAnalyticsService } from '../../../services/adminAnalyticsService';
import toast from 'react-hot-toast';

export const AdminDashboardPage = () => {
  const { adminUser } = useAdminAuth();
  const { isDark, accentColor } = useTheme();
  const [dateRange, setDateRange] = useState('30d');
  const navigate = useNavigate();

  const stats = mockAdminAnalytics.summary;
  const pendingReports = mockModerationReports.filter((r) => r.status === 'pending');
  const recentUsers = mockPlatformUsers.slice(0, 4);
  const recentIdeas = mockAdminIdeas.slice(0, 4);
  const recentLogs = mockAdminActivityLogs.slice(0, 4);

  const handleExportSummary = () => {
    adminAnalyticsService.exportToCSV('fuse-executive-summary', [stats]);
    toast.success('Executive metrics exported to CSV');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <AdminPageHeader
        title={`Welcome back, ${adminUser?.name || 'Administrator'}`}
        description="Comprehensive platform control plane: monitor platform telemetry, review user growth, inspect moderation queues, and manage RAG operations."
        breadcrumbs={[{ label: 'Dashboard' }]}
        actions={
          <div className="flex items-center gap-2.5 flex-wrap">
            <AdminDateRangePicker activeRange={dateRange} onRangeChange={setDateRange} />
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExportSummary}
              className="text-xs font-semibold"
            >
              Export Metrics
            </Button>
          </div>
        }
      />

      {/* Pending Reports Urgent Alert Banner (if pending reports exist) */}
      {pendingReports.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                {pendingReports.length} Moderation Reports Awaiting Review
              </h4>
              <p className="text-xs text-amber-700 dark:text-amber-300/80">
                Community members reported potential spam, policy violations, or suspicious activity.
              </p>
            </div>
          </div>
          <Link to="/admin/moderation">
            <Button variant="primary" size="sm" className="!bg-amber-600 hover:!bg-amber-700 text-white shrink-0">
              Open Moderation Queue ({pendingReports.length})
            </Button>
          </Link>
        </div>
      )}

      {/* Primary 8 Key Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change="+18.4%"
          changeType="positive"
          icon={Users}
          caption={`${stats.activeUsersDAU} active daily (DAU)`}
        />
        <AdminStatCard
          title="Published Ideas"
          value={stats.publishedIdeas}
          change="+24%"
          changeType="positive"
          icon={Lightbulb}
          caption={`${stats.totalIdeas} total ideas submitted`}
        />
        <AdminStatCard
          title="Collaborations"
          value={stats.totalCollaborations}
          change="+31%"
          changeType="positive"
          icon={Handshake}
          caption={`${stats.collaborationSuccessRate} acceptance rate`}
        />
        <AdminStatCard
          title="Teams Formed"
          value={stats.totalTeams}
          change="+12%"
          changeType="positive"
          icon={Users2}
          caption="Active multidisciplinary pods"
        />
        <AdminStatCard
          title="Monthly Active (MAU)"
          value={stats.activeUsersMAU}
          change="+15.2%"
          changeType="positive"
          icon={TrendingUp}
          caption={`${stats.retentionRate30D} 30-day retention`}
        />
        <AdminStatCard
          title="AI Analyses (RAG)"
          value={stats.aiAnalysesRun.toLocaleString()}
          change="99.2%"
          changeType="positive"
          icon={Cpu}
          caption={`Avg latency ${stats.aiAvgLatencyMs}ms`}
        />
        <AdminStatCard
          title="Pending Reports"
          value={stats.pendingReports}
          change={stats.pendingReports > 0 ? 'Requires Action' : 'All Clear'}
          changeType={stats.pendingReports > 0 ? 'negative' : 'positive'}
          icon={ShieldAlert}
          caption="Trust & safety queue"
        />
        <AdminStatCard
          title="New Sprints"
          value="42"
          change="+8 this week"
          changeType="positive"
          icon={Sparkles}
          caption="Across active milestones"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth & Active Trajectory */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
                User Growth & Active Engagement
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] mt-0.5">
                Total registered accounts vs monthly active contributors (MAU)
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                <span className="w-3 h-3 rounded-md bg-[#171717] dark:bg-white inline-block" /> Total Users
              </span>
              <span className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                <span className="w-3 h-3 rounded-md bg-[#635BFF] inline-block" /> Active MAU
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockAdminAnalytics.userGrowthTimeseries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDark ? '#F5F5F0' : '#171717'} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={isDark ? '#F5F5F0' : '#171717'} stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#635BFF" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#635BFF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#8C8C87" fontSize={11} tickLine={false} />
                <YAxis stroke="#8C8C87" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#222220' : '#171717',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="users" stroke={isDark ? '#F5F5F0' : '#171717'} strokeWidth={2.5} fillOpacity={1} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="active" stroke="#635BFF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Connection Type Distribution */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
              Connection Type Distribution
            </h3>
            <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] mt-0.5">
              Breakdown across the 5 human-centered collaboration formats
            </p>
          </div>

          <div className="space-y-3.5 my-4">
            {mockAdminAnalytics.connectionTypeDistribution.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#171717] dark:text-[#F5F5F0]">
                    {item.name}
                  </span>
                  <span className="font-mono text-[#71717A] dark:text-[#A8A8A2]">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.fill }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F0EFEA] dark:border-[#22221F] flex items-center justify-between text-xs text-[#71717A] dark:text-[#A8A8A2]">
            <span>Total Requests</span>
            <strong className="text-[#171717] dark:text-white font-mono">{stats.totalCollaborations}</strong>
          </div>
        </div>
      </div>

      {/* Ideas Velocity & AI RAG Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ideas & Collaboration Velocity */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
                Ideas Published vs Connections Formed
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] mt-0.5">
                Monthly collaboration momentum
              </p>
            </div>
            <Link to="/admin/ideas" className="text-xs text-[#FF7043] font-semibold hover:underline">
              View Ideas
            </Link>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAdminAnalytics.ideasVelocityTimeseries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#8C8C87" fontSize={11} tickLine={false} />
                <YAxis stroke="#8C8C87" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#222220' : '#171717',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="ideas" fill={accentColor || '#FF7043'} radius={[4, 4, 0, 0]} />
                <Bar dataKey="collaborations" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI RAG Pipeline Operational Health */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
                RAG AI Similarity Detection Health
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] mt-0.5">
                Real-time operational latency and vector retrieval status
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" /> All Systems Nominal
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] text-center">
              <span className="text-[10px] text-[#71717A] uppercase font-bold tracking-wide">Avg Latency</span>
              <p className="text-xl font-extrabold text-[#171717] dark:text-[#F5F5F0] font-mono mt-1">420ms</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] text-center">
              <span className="text-[10px] text-[#71717A] uppercase font-bold tracking-wide">Success Rate</span>
              <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">99.2%</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] text-center">
              <span className="text-[10px] text-[#71717A] uppercase font-bold tracking-wide">Vectors Stored</span>
              <p className="text-xl font-extrabold text-[#171717] dark:text-[#F5F5F0] font-mono mt-1">218</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] flex items-center justify-between text-xs">
            <span className="text-[#71717A] dark:text-[#A8A8A2]">Vector Database: <strong>pgvector (PostgreSQL)</strong></span>
            <Link to="/admin/ai-monitoring" className="text-[#FF7043] font-bold hover:underline flex items-center gap-1">
              AI Console <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Users, Recent Ideas, Recent Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Registrations */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
              Recent Registrations
            </h3>
            <Link to="/admin/users" className="text-xs text-[#FF7043] font-semibold hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-[#F0EFEA] dark:divide-[#22221F]">
            {recentUsers.map((u) => (
              <div key={u.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0] truncate">{u.name}</p>
                    <p className="text-[11px] text-[#71717A] dark:text-[#A8A8A2] truncate">{u.email}</p>
                  </div>
                </div>
                <AdminStatusBadge status={u.accountStatus} size="xs" />
              </div>
            ))}
          </div>
        </div>

        {/* Recently Published Ideas */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
              Recently Published Ideas
            </h3>
            <Link to="/admin/ideas" className="text-xs text-[#FF7043] font-semibold hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-[#F0EFEA] dark:divide-[#22221F]">
            {recentIdeas.map((idea) => (
              <div key={idea.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0] truncate">
                    {idea.title}
                  </p>
                  <p className="text-[11px] text-[#71717A] dark:text-[#A8A8A2] truncate">
                    by {idea.creator.name} • {idea.category}
                  </p>
                </div>
                <AdminStatusBadge status={idea.status} size="xs" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Admin Audit Logs */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
              Admin Activity Logs
            </h3>
            <Link to="/admin/activity-logs" className="text-xs text-[#FF7043] font-semibold hover:underline">
              Full Audit Trail
            </Link>
          </div>

          <div className="divide-y divide-[#F0EFEA] dark:divide-[#22221F]">
            {recentLogs.map((log) => (
              <div key={log.id} className="py-2.5 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#171717] dark:text-[#F5F5F0]">{log.adminName}</span>
                  <span className="text-[#A3A3A3] font-mono">{log.timestamp.slice(11)}</span>
                </div>
                <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] line-clamp-1">{log.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
