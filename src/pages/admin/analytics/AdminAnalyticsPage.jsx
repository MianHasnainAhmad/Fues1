import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  Lightbulb,
  Handshake,
  Users2,
  PieChart as PieIcon,
  Layers,
  ArrowUpRight,
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
import { Button } from '../../../components/common/Button';
import { useTheme } from '../../../context/ThemeContext';
import { mockAdminAnalytics, mockAdminCategories, mockAdminSkills } from '../../../data/mockAdminData';
import { adminAnalyticsService } from '../../../services/adminAnalyticsService';
import toast from 'react-hot-toast';

export const AdminAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('30d');
  const { isDark, accentColor } = useTheme();

  const stats = mockAdminAnalytics.summary;

  const handleExportAll = () => {
    adminAnalyticsService.exportToCSV('fuse-platform-analytics', [
      {
        metric: 'Total Registered Users',
        value: stats.totalUsers,
        growth: stats.userGrowthMoM,
      },
      {
        metric: 'Active Users (DAU)',
        value: stats.activeUsersDAU,
        growth: '+12%',
      },
      {
        metric: 'Active Users (MAU)',
        value: stats.activeUsersMAU,
        growth: '+15.2%',
      },
      {
        metric: 'Total Ideas Published',
        value: stats.publishedIdeas,
        growth: '+24%',
      },
      {
        metric: 'Total Collaborations',
        value: stats.totalCollaborations,
        growth: stats.collaborationSuccessRate,
      },
      {
        metric: 'Total Teams Formed',
        value: stats.totalTeams,
        growth: '+12%',
      },
    ]);
    toast.success('Analytics dataset downloaded as CSV');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <AdminPageHeader
        title="Platform Analytics & Intelligence"
        description="Deep-dive performance telemetry: user retention rates, conversion velocity, cross-disciplinary collaboration health, and category growth."
        breadcrumbs={[{ label: 'Analytics' }]}
        actions={
          <div className="flex items-center gap-2.5 flex-wrap">
            <AdminDateRangePicker activeRange={dateRange} onRangeChange={setDateRange} />
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={handleExportAll}
            >
              Export CSV Dataset
            </Button>
          </div>
        }
      />

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          title="User Retention (30D)"
          value={stats.retentionRate30D}
          change="+4.2%"
          changeType="positive"
          icon={TrendingUp}
          caption="Cohorts returning to collaborate"
        />
        <AdminStatCard
          title="Collaboration Success"
          value={stats.collaborationSuccessRate}
          change="+6.1%"
          changeType="positive"
          icon={Handshake}
          caption="Requests accepted by idea leads"
        />
        <AdminStatCard
          title="Daily Active (DAU)"
          value={stats.activeUsersDAU}
          change="+18% vs benchmark"
          changeType="positive"
          icon={Users}
          caption="Logged in within last 24h"
        />
        <AdminStatCard
          title="Ideas Published Rate"
          value="84.4%"
          change="Draft to Published"
          changeType="positive"
          icon={Lightbulb}
          caption={`${stats.publishedIdeas} of ${stats.totalIdeas} ideas active`}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth & Engagement */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
                User Trajectory & Active Engagement
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] mt-0.5">
                Total accounts vs monthly active contributors (MAU)
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600">
              {stats.userGrowthMoM} MoM
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockAdminAnalytics.userGrowthTimeseries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsersAnly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={accentColor || '#FF7043'} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={accentColor || '#FF7043'} stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorActiveAnly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#635BFF" stopOpacity={0.3} />
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
                <Area type="monotone" dataKey="users" stroke={accentColor || '#FF7043'} strokeWidth={2.5} fillOpacity={1} fill="url(#colorUsersAnly)" />
                <Area type="monotone" dataKey="active" stroke="#635BFF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorActiveAnly)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ideas vs Collaboration Momentum */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
                Ideas Published vs Connection Requests
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] mt-0.5">
                Proportion of ideas leading to active collaborative outreach
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#635BFF]">
              342 Total Connections
            </span>
          </div>

          <div className="h-64 w-full">
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
                <Bar dataKey="ideas" fill={isDark ? '#F5F5F0' : '#171717'} radius={[4, 4, 0, 0]} />
                <Bar dataKey="collaborations" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lower Row: Category Share & Skill Demand vs Supply */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
            Idea Domain Share
          </h3>
          <div className="space-y-3">
            {mockAdminCategories.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#171717] dark:text-[#F5F5F0] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <span className="font-mono text-[#71717A] dark:text-[#A8A8A2]">
                    {cat.ideasCount} ideas ({Math.round((cat.ideasCount / 218) * 100)}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(cat.ideasCount / 45) * 100}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Demand vs Supply */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
            Most Requested Skills
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {mockAdminSkills.slice(0, 8).map((skill) => (
              <div
                key={skill.id}
                className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0] truncate">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#71717A] uppercase">
                    {skill.category}
                  </span>
                </div>
                <span className="text-sm font-extrabold text-[#635BFF] font-mono block">
                  {skill.usersCount} creators
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
