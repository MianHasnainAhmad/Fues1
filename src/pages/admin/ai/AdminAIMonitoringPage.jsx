import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Database,
  Layers,
  Sparkles,
  AlertTriangle,
  Code,
  Download,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminStatCard } from '../../../components/admin/common/AdminStatCard';
import { AdminDataTable } from '../../../components/admin/common/AdminDataTable';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { Button } from '../../../components/common/Button';
import { adminAIService } from '../../../services/adminAIService';
import { mockAdminAnalytics } from '../../../data/mockAdminData';
import { useTheme } from '../../../context/ThemeContext';
import toast from 'react-hot-toast';

export const AdminAIMonitoringPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [inspectedAnalysis, setInspectedAnalysis] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const loadAIData = async () => {
      setLoading(true);
      try {
        const [m, h] = await Promise.all([
          adminAIService.getAIMetrics(),
          adminAIService.getAnalysesHistory({ status: statusFilter }),
        ]);
        setMetrics(m);
        setHistory(h.results);
      } catch {
        toast.error('Failed to load AI system metrics');
      } finally {
        setLoading(false);
      }
    };
    loadAIData();
  }, [statusFilter]);

  const columns = [
    {
      header: 'Analysis ID',
      key: 'id',
      render: (a) => (
        <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
          #{a.id}
        </span>
      ),
    },
    {
      header: 'Submitted Idea',
      key: 'ideaTitle',
      sortable: true,
      render: (a) => (
        <div className="space-y-0.5 max-w-sm">
          <span className="text-xs sm:text-sm font-bold text-[#171717] dark:text-[#F5F5F0] truncate block">
            {a.ideaTitle}
          </span>
          <span className="text-[11px] text-[#71717A] dark:text-[#A8A8A2]">
            by {a.user.name} • {a.categoryDetected}
          </span>
        </div>
      ),
    },
    {
      header: 'Latency',
      key: 'processingTimeMs',
      sortable: true,
      render: (a) => (
        <span className="text-xs font-mono font-bold text-[#171717] dark:text-[#F5F5F0]">
          {a.processingTimeMs}ms
        </span>
      ),
    },
    {
      header: 'Similarity Match',
      key: 'similarityScore',
      sortable: true,
      render: (a) => (
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <span>{a.similarityScore}%</span>
          <span className="text-[10px] text-stone-400 font-normal">cosine</span>
        </div>
      ),
    },
    {
      header: 'Date & Time',
      key: 'submittedDate',
      sortable: true,
      render: (a) => (
        <span className="text-xs font-mono text-[#71717A] dark:text-[#A8A8A2]">
          {a.submittedDate}
        </span>
      ),
    },
    {
      header: 'Pipeline Status',
      key: 'status',
      sortable: true,
      render: (a) => <AdminStatusBadge status={a.status} size="xs" />,
    },
    {
      header: 'Inspection',
      key: 'actions',
      className: 'text-right',
      cellClassName: 'text-right',
      render: (a) => (
        <Button
          variant="secondary"
          size="xs"
          icon={Eye}
          onClick={() => setInspectedAnalysis(a)}
        >
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <AdminPageHeader
        title="AI System & RAG Telemetry"
        description="Monitor retrieval-augmented generation (RAG) performance, vector index queries, cosine similarity calculations, latency distributions, and query error logs."
        breadcrumbs={[{ label: 'AI Monitoring' }]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> pgvector Active
            </span>
          </div>
        }
      />

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          title="Total Analyses"
          value={metrics ? metrics.totalAnalyses.toLocaleString() : '1,890'}
          change="+14% this week"
          changeType="positive"
          icon={Cpu}
          caption="Executed via RAG inference pipeline"
        />
        <AdminStatCard
          title="Success Rate"
          value={metrics ? metrics.successRate : '99.2%'}
          change="0.8% error rate"
          changeType="positive"
          icon={CheckCircle}
          caption="Zero API throttling events"
        />
        <AdminStatCard
          title="Average Latency"
          value={metrics ? `${metrics.averageLatencyMs}ms` : '420ms'}
          change="-35ms vs last month"
          changeType="positive"
          icon={Clock}
          caption="Embedding + similarity retrieval"
        />
        <AdminStatCard
          title="Vector Index Size"
          value={metrics ? metrics.totalIndexedIdeaVectors : '218'}
          change="1536 dimensions"
          changeType="neutral"
          icon={Layers}
          caption="text-embedding-3-small"
        />
      </div>

      {/* Latency & Query Volume Chart */}
      <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
              Daily AI Inference Calls & Latency
            </h3>
            <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] mt-0.5">
              Query volume handled by the vector similarity pipeline
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
            Avg 420ms Response Time
          </span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockAdminAnalytics.aiUsageOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
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
              <Area type="monotone" dataKey="calls" stroke="#8B5CF6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCalls)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Analysis History Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
            AI Similarity Query Logs
          </h3>
          <span className="text-xs text-[#71717A]">
            Showing recent RAG evaluations
          </span>
        </div>

        <AdminDataTable
          columns={columns}
          data={history}
          searchPlaceholder="Search AI queries by idea or user..."
          exportFilename="fuse-ai-analysis-logs"
          loading={loading}
          filterComponent={
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
            >
              <option value="all">All Query Results</option>
              <option value="success">Successful Queries</option>
              <option value="failed">Failed / Flagged Queries</option>
            </select>
          }
        />
      </div>

      {/* AI Query Inspector Modal */}
      {inspectedAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F0EFEA] dark:border-[#22221F]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-purple-600">
                    Query #{inspectedAnalysis.id}
                  </span>
                  <AdminStatusBadge status={inspectedAnalysis.status} size="xs" />
                </div>
                <h3 className="text-lg font-bold text-[#171717] dark:text-[#F5F5F0]">
                  {inspectedAnalysis.ideaTitle}
                </h3>
                <span className="text-xs text-[#71717A]">
                  Submitted by {inspectedAnalysis.user.name} on {inspectedAnalysis.submittedDate}
                </span>
              </div>

              <button
                onClick={() => setInspectedAnalysis(null)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Performance telemetry */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                <span className="text-[10px] text-[#71717A] uppercase font-bold">Latency</span>
                <p className="text-lg font-black font-mono mt-0.5 text-[#171717] dark:text-[#F5F5F0]">{inspectedAnalysis.processingTimeMs}ms</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                <span className="text-[10px] text-[#71717A] uppercase font-bold">Similarity Score</span>
                <p className="text-lg font-black font-mono mt-0.5 text-emerald-600">{inspectedAnalysis.similarityScore}%</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                <span className="text-[10px] text-[#71717A] uppercase font-bold">Chunks Retrieved</span>
                <p className="text-lg font-black font-mono mt-0.5 text-purple-600">{inspectedAnalysis.retrievedIdeasCount}</p>
              </div>
            </div>

            {/* Top Semantic Match */}
            <div className="p-4 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-[#71717A] uppercase">Top Knowledge Match</span>
              <p className="font-bold text-[#171717] dark:text-[#F5F5F0]">
                {inspectedAnalysis.topMatch}
              </p>
              <p className="text-[#71717A]">
                Classified Category: <strong>{inspectedAnalysis.categoryDetected}</strong>
              </p>
            </div>

            {/* Differentiation Suggestions */}
            {inspectedAnalysis.differentiationSuggestions?.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0]">
                  Generated Differentiation Suggestions:
                </span>
                <ul className="space-y-1.5 text-xs text-[#71717A] dark:text-[#A8A8A2]">
                  {inspectedAnalysis.differentiationSuggestions.map((sug, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Error Log if query failed */}
            {inspectedAnalysis.errorLog && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
                  <AlertTriangle className="w-4 h-4" /> Pipeline Exception Log
                </div>
                <pre className="text-[11px] font-mono text-rose-800 dark:text-rose-300 whitespace-pre-wrap">
                  {inspectedAnalysis.errorLog}
                </pre>
              </div>
            )}

            <div className="pt-4 border-t border-[#F0EFEA] dark:border-[#22221F] flex items-center justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setInspectedAnalysis(null)}
              >
                Close Inspector
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAIMonitoringPage;
