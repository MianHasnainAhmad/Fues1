import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Plus,
  Users2,
  FileText,
  Calendar,
  Trash2,
  Check,
  ChevronRight,
  Flame,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { teamService } from '../../services/teamService';
import { STAGE_STEPS } from '../../data/mockTeams';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const TeamWorkspacePage = () => {
  const { id } = useParams();
  const teamId = id || 'team-1';
  const { user } = useAuth();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'tasks' | 'milestones' | 'members' | 'decisions'

  // Modal states
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskDue, setNewTaskDue] = useState('Next Week');

  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneStage, setNewMilestoneStage] = useState('MVP Planning');
  const [newMilestoneTargetDate, setNewMilestoneTargetDate] = useState('Dec 15, 2026');
  const [newMilestoneDesc, setNewMilestoneDesc] = useState('');

  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [newDecisionTitle, setNewDecisionTitle] = useState('');
  const [newDecisionDesc, setNewDecisionDesc] = useState('');

  useEffect(() => {
    loadTeam();
  }, [teamId]);

  const loadTeam = async () => {
    try {
      setLoading(true);
      const res = await teamService.getTeamById(teamId);
      setTeam(res);
    } catch {
      // Fallback to first team
      const all = await teamService.getTeams();
      setTeam(all[0]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await teamService.createTask(team.id, {
        title: newTaskTitle,
        description: newTaskDesc,
        priority: newTaskPriority,
        dueDate: newTaskDue,
        assignedTo: {
          id: user?.id || 'me',
          name: user?.name || 'Alex Morgan',
          avatar: user?.avatar,
        },
      });
      toast.success('Task added to Kanban board');
      setShowTaskModal(false);
      setNewTaskTitle('');
      setNewTaskDesc('');
      loadTeam();
    } catch {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await teamService.updateTaskStatus(team.id, taskId, newStatus);
      setTeam((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
      }));
      toast.success(`Task moved to ${newStatus}`);
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await teamService.deleteTask(team.id, taskId);
      setTeam((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((t) => t.id !== taskId),
      }));
      toast.success('Task removed');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleMilestone = async (mId) => {
    try {
      await teamService.toggleMilestone(team.id, mId);
      toast.success('Milestone progress updated!');
      loadTeam();
    } catch {
      toast.error('Failed to update milestone');
    }
  };

  const handleCreateMilestone = async (e) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;
    try {
      await teamService.createMilestone(team.id, {
        title: newMilestoneTitle,
        stage: newMilestoneStage,
        targetDate: newMilestoneTargetDate,
        description: newMilestoneDesc,
      });
      toast.success('New milestone added');
      setShowMilestoneModal(false);
      setNewMilestoneTitle('');
      setNewMilestoneDesc('');
      loadTeam();
    } catch {
      toast.error('Failed to create milestone');
    }
  };

  const handleCreateDecision = async (e) => {
    e.preventDefault();
    if (!newDecisionTitle.trim()) return;
    try {
      await teamService.addDecisionLog(
        team.id,
        {
          title: newDecisionTitle,
          description: newDecisionDesc,
        },
        user
      );
      toast.success('Decision logged in team history');
      setShowDecisionModal(false);
      setNewDecisionTitle('');
      setNewDecisionDesc('');
      loadTeam();
    } catch {
      toast.error('Failed to log decision');
    }
  };

  if (loading || !team) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="w-8 h-8 border-3 border-[#FF7043] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const todoTasks = team.tasks?.filter((t) => t.status === 'To Do') || [];
  const inProgressTasks = team.tasks?.filter((t) => t.status === 'In Progress') || [];
  const doneTasks = team.tasks?.filter((t) => t.status === 'Completed') || [];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Team Header Banner */}
      <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7043]">
                {team.category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] font-semibold">
                {team.currentStage}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
              {team.name}
            </h1>
            <p className="text-sm text-[#525252] leading-relaxed max-w-2xl">{team.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link to={`/ideas/${team.ideaId}`}>
              <Button variant="outline" size="sm">
                Original Idea Spec
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="primary" size="sm">
                Team Chat
              </Button>
            </Link>
          </div>
        </div>

        {/* Milestone Lifecycle Stepper: Idea → Team Formed → MVP Planning → In Development → Launched */}
        <div className="pt-4 border-t border-[#F0EFEA] space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#737373]">
            <span>Milestone Lifecycle Tracker</span>
            <span className="text-[#FF7043] font-bold">{team.progressPercentage}% Completed</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
            {STAGE_STEPS.map((step, idx) => {
              const isPast = idx < team.currentStageIndex;
              const isCurrent = idx === team.currentStageIndex;
              return (
                <div
                  key={step}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isPast
                      ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]'
                      : isCurrent
                      ? 'bg-[#FFF0EB] border-[#FFD8CC] text-[#FF7043] font-bold ring-1 ring-[#FF7043]'
                      : 'bg-[#F8F8F5] border-[#E8E7E0] text-[#A3A3A3]'
                  }`}
                >
                  <p className="text-[10px] font-mono uppercase">Stage {idx + 1}</p>
                  <p className="text-xs truncate">{step}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#F0EFEA]">
          {[
            { id: 'overview', label: 'Overview', icon: FolderKanban },
            { id: 'tasks', label: `Kanban Tasks (${team.tasks?.length || 0})`, icon: CheckCircle2 },
            { id: 'milestones', label: `Milestones (${team.milestones?.length || 0})`, icon: Clock },
            { id: 'members', label: `Members (${team.members?.length || 0})`, icon: Users2 },
            { id: 'decisions', label: `Decision Log (${team.decisionLogs?.length || 0})`, icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#171717] text-white shadow-xs dark:bg-white dark:text-[#171717]'
                    : 'text-[#737373] hover:text-[#171717] hover:bg-[#F8F8F5] dark:hover:text-white dark:hover:bg-[#262624]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#171717]">Current Sprint Goals</h3>
              <p className="text-sm text-[#525252] leading-relaxed">
                The team is actively building the MVP. Sarah is polishing the responsive audio scrubbers, Alex is wiring the client-side Opus recording chunker, and Marcus is deploying the broker pipeline.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-[#F8F8F5] border border-[#E8E7E0]">
                  <p className="text-xs text-[#737373]">Tasks in Flight</p>
                  <p className="text-lg font-bold text-[#171717]">{inProgressTasks.length} in progress</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#F8F8F5] border border-[#E8E7E0]">
                  <p className="text-xs text-[#737373]">Completed Tasks</p>
                  <p className="text-lg font-bold text-[#059669]">{doneTasks.length} shipped</p>
                </div>
              </div>
            </div>

            {/* Recent Decisions Teaser */}
            <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#171717]">Recent Architectural Decisions</h3>
                <button
                  onClick={() => setActiveTab('decisions')}
                  className="text-xs font-semibold text-[#FF7043] hover:underline cursor-pointer"
                >
                  View All Log →
                </button>
              </div>

              <div className="space-y-3">
                {team.decisionLogs?.slice(0, 2).map((d) => (
                  <div key={d.id} className="p-4 rounded-2xl bg-[#F8F8F5] border border-[#E8E7E0] space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#171717]">{d.title}</span>
                      <span className="text-[#737373]">{d.date}</span>
                    </div>
                    <p className="text-xs text-[#525252] line-clamp-2">{d.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Members Sidebar in Overview */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#171717]">Team Roster</h3>
                <button
                  onClick={() => setActiveTab('members')}
                  className="text-xs font-semibold text-[#FF7043] hover:underline cursor-pointer"
                >
                  Manage →
                </button>
              </div>

              <div className="space-y-3">
                {team.members?.map((m) => (
                  <div key={m.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Avatar src={m.avatar} name={m.name} size="sm" />
                      <div>
                        <p className="text-xs font-bold text-[#171717]">{m.name}</p>
                        <p className="text-[10px] text-[#737373]">{m.title}</p>
                      </div>
                    </div>
                    <Badge variant={m.role === 'Owner' ? 'primary' : 'default'} size="sm">
                      {m.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Kanban Tasks Board */}
      {activeTab === 'tasks' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#171717]">Team Tasks Board</h2>
              <p className="text-xs text-[#737373]">Coordinate deliverables, review pull requests, and track progress.</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setShowTaskModal(true)}
            >
              Add Task
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: To Do */}
            <div className="bg-[#F8F8F5] rounded-3xl p-4 border border-[#E8E7E0] space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#737373]">
                  To Do ({todoTasks.length})
                </span>
              </div>

              <div className="space-y-3">
                {todoTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-2xl border border-[#E8E7E0] p-4 shadow-2xs space-y-3 hover-lift"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-[#171717] leading-snug">{task.title}</h4>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-[#A3A3A3] hover:text-red-500 cursor-pointer"
                        title="Delete task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#525252] line-clamp-2">{task.description}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F0EFEA] text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Avatar src={task.assignedTo?.avatar} name={task.assignedTo?.name} size="xs" />
                        <span className="text-[#737373]">{task.assignedTo?.name.split(' ')[0]}</span>
                      </div>
                      <button
                        onClick={() => handleUpdateTaskStatus(task.id, 'In Progress')}
                        className="text-[#FF7043] font-semibold hover:underline cursor-pointer"
                      >
                        Start →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-[#FFFBF9] rounded-3xl p-4 border border-[#FFD8CC] space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF7043]">
                  In Progress ({inProgressTasks.length})
                </span>
              </div>

              <div className="space-y-3">
                {inProgressTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-2xl border border-[#FFD8CC] p-4 shadow-2xs space-y-3 hover-lift"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-[#171717] leading-snug">{task.title}</h4>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-[#A3A3A3] hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#525252] line-clamp-2">{task.description}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F0EFEA] text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Avatar src={task.assignedTo?.avatar} name={task.assignedTo?.name} size="xs" />
                        <span className="text-[#737373]">{task.assignedTo?.name.split(' ')[0]}</span>
                      </div>
                      <button
                        onClick={() => handleUpdateTaskStatus(task.id, 'Completed')}
                        className="text-emerald-600 font-semibold hover:underline cursor-pointer"
                      >
                        Complete ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Completed */}
            <div className="bg-[#F8F8F5] rounded-3xl p-4 border border-[#E8E7E0] space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Completed ({doneTasks.length})
                </span>
              </div>

              <div className="space-y-3">
                {doneTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-2xl border border-[#E8E7E0] p-4 shadow-2xs space-y-2 opacity-85"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-[#171717] line-through leading-snug">
                        {task.title}
                      </h4>
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#F0EFEA] text-[10px] text-[#737373]">
                      <span>Done by {task.assignedTo?.name.split(' ')[0]}</span>
                      <button
                        onClick={() => handleUpdateTaskStatus(task.id, 'In Progress')}
                        className="hover:underline cursor-pointer text-[#737373]"
                      >
                        Reopen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Milestones */}
      {activeTab === 'milestones' && (
        <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#171717]">Team Milestones & Target Sprints</h2>
              <p className="text-xs text-[#737373]">Sequential milestones required to bring this project to reality.</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setShowMilestoneModal(true)}
            >
              Add Milestone
            </Button>
          </div>

          <div className="divide-y divide-[#F0EFEA]">
            {team.milestones?.map((m) => (
              <div key={m.id} className="py-4 flex items-start gap-4">
                <button
                  onClick={() => handleToggleMilestone(m.id)}
                  className={`mt-1 w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    m.completed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-[#E8E7E0] hover:border-[#FF7043]'
                  }`}
                  title={m.completed ? 'Mark incomplete' : 'Mark completed'}
                >
                  {m.completed && <Check className="w-4 h-4 stroke-[3]" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-bold ${
                        m.completed ? 'line-through text-[#737373]' : 'text-[#171717]'
                      }`}
                    >
                      {m.title}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F8F8F5] border border-[#E8E7E0] text-[#737373]">
                      {m.stage}
                    </span>
                  </div>
                  <p className="text-xs text-[#525252] mt-1">{m.description}</p>
                  <p className="text-[11px] text-[#A3A3A3] mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Target Date: {m.targetDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Members */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-bold text-[#171717]">Workspace Members & Roles</h2>
            <p className="text-xs text-[#737373]">Active contributors collaborating on this idea.</p>
          </div>

          <div className="divide-y divide-[#F0EFEA]">
            {team.members?.map((member) => (
              <div key={member.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar src={member.avatar} name={member.name} size="md" />
                  <div>
                    <h4 className="text-sm font-bold text-[#171717]">{member.name}</h4>
                    <p className="text-xs text-[#737373]">{member.title}</p>
                    <span className="text-[10px] text-[#A3A3A3]">Joined: {member.joinedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={member.role === 'Owner' ? 'primary' : 'default'} size="sm">
                    {member.role}
                  </Badge>
                  <Link to={`/profile/${member.id}`}>
                    <Button variant="outline" size="sm">
                      Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Decision Log */}
      {activeTab === 'decisions' && (
        <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#171717]">Team Decision Log</h2>
              <p className="text-xs text-[#737373]">
                Chronological record of key architectural, design, and strategic agreements.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setShowDecisionModal(true)}
            >
              Log Decision
            </Button>
          </div>

          <div className="space-y-4">
            {team.decisionLogs?.map((log) => (
              <div key={log.id} className="p-5 rounded-2xl bg-[#F8F8F5] border border-[#E8E7E0] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#171717]">{log.title}</h4>
                  <span className="text-xs text-[#737373]">{log.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
                  {log.description}
                </p>
                <div className="flex items-center gap-2 pt-2 text-xs text-[#737373]">
                  <Avatar src={log.author?.avatar} name={log.author?.name} size="xs" />
                  <span>Logged by {log.author?.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      <Modal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        title="Add New Task"
        description="Create an actionable step on the team Kanban board."
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="e.g. Set up WebSocket audio stream listener"
            required
          />

          <Textarea
            label="Task Description"
            value={newTaskDesc}
            onChange={(e) => setNewTaskDesc(e.target.value)}
            placeholder="Details, requirements, or links..."
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              options={['Low', 'Medium', 'High']}
            />
            <Input
              label="Due Target"
              value={newTaskDue}
              onChange={(e) => setNewTaskDue(e.target.value)}
              placeholder="e.g. Next Tuesday"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowTaskModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Task
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Milestone Modal */}
      <Modal
        isOpen={showMilestoneModal}
        onClose={() => setShowMilestoneModal(false)}
        title="Create Sprint Milestone"
        description="Define a major goalpost for your team."
      >
        <form onSubmit={handleCreateMilestone} className="space-y-4">
          <Input
            label="Milestone Title"
            value={newMilestoneTitle}
            onChange={(e) => setNewMilestoneTitle(e.target.value)}
            placeholder="e.g. Alpha launch to 50 audio beta testers"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Lifecycle Stage"
              value={newMilestoneStage}
              onChange={(e) => setNewMilestoneStage(e.target.value)}
              options={STAGE_STEPS}
            />
            <Input
              label="Target Date"
              value={newMilestoneTargetDate}
              onChange={(e) => setNewMilestoneTargetDate(e.target.value)}
              placeholder="e.g. Dec 15, 2026"
            />
          </div>

          <Textarea
            label="Description / Deliverable"
            value={newMilestoneDesc}
            onChange={(e) => setNewMilestoneDesc(e.target.value)}
            rows={3}
            placeholder="What does success look like for this milestone?"
          />

          <div className="flex justify-end gap-2.5 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowMilestoneModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Milestone
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Decision Log Modal */}
      <Modal
        isOpen={showDecisionModal}
        onClose={() => setShowDecisionModal(false)}
        title="Record Architecture / Design Decision"
        description="Preserve team context on why certain paths were chosen."
      >
        <form onSubmit={handleCreateDecision} className="space-y-4">
          <Input
            label="Decision Title"
            value={newDecisionTitle}
            onChange={(e) => setNewDecisionTitle(e.target.value)}
            placeholder="e.g. Selected PostgreSQL with pgvector for embeddings"
            required
          />

          <Textarea
            label="Context & Rationale"
            value={newDecisionDesc}
            onChange={(e) => setNewDecisionDesc(e.target.value)}
            rows={4}
            placeholder="Why was this chosen over alternatives? What trade-offs were accepted?"
            required
          />

          <div className="flex justify-end gap-2.5 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowDecisionModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Decision
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
