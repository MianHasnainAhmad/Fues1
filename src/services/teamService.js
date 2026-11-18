import { mockTeams } from '../data/mockTeams';

const STORAGE_TEAMS = 'fuse_teams_data';

const getStoredTeams = () => {
  const raw = localStorage.getItem(STORAGE_TEAMS);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return mockTeams;
    }
  }
  localStorage.setItem(STORAGE_TEAMS, JSON.stringify(mockTeams));
  return mockTeams;
};

const saveStoredTeams = (teams) => {
  localStorage.setItem(STORAGE_TEAMS, JSON.stringify(teams));
};

export const teamService = {
  async getTeams() {
    await new Promise((r) => setTimeout(r, 200));
    return getStoredTeams();
  },

  async getTeamById(id) {
    await new Promise((r) => setTimeout(r, 150));
    const teams = getStoredTeams();
    const team = teams.find((t) => t.id === id);
    if (!team) throw new Error('Team workspace not found');
    return team;
  },

  async createTask(teamId, taskData) {
    const teams = getStoredTeams();
    const teamIndex = teams.findIndex((t) => t.id === teamId);
    if (teamIndex === -1) throw new Error('Team not found');

    const newTask = {
      id: `t-${Date.now()}`,
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'Medium',
      status: taskData.status || 'To Do',
      dueDate: taskData.dueDate || 'Flexible',
      assignedTo: taskData.assignedTo || {
        id: 'me',
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      },
    };

    teams[teamIndex].tasks.unshift(newTask);
    saveStoredTeams(teams);
    return newTask;
  },

  async updateTaskStatus(teamId, taskId, newStatus) {
    const teams = getStoredTeams();
    const teamIndex = teams.findIndex((t) => t.id === teamId);
    if (teamIndex === -1) throw new Error('Team not found');

    const taskIndex = teams[teamIndex].tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) throw new Error('Task not found');

    teams[teamIndex].tasks[taskIndex].status = newStatus;
    saveStoredTeams(teams);
    return teams[teamIndex].tasks[taskIndex];
  },

  async deleteTask(teamId, taskId) {
    const teams = getStoredTeams();
    const teamIndex = teams.findIndex((t) => t.id === teamId);
    if (teamIndex === -1) throw new Error('Team not found');

    teams[teamIndex].tasks = teams[teamIndex].tasks.filter((t) => t.id !== taskId);
    saveStoredTeams(teams);
    return true;
  },

  async createMilestone(teamId, milestoneData) {
    const teams = getStoredTeams();
    const teamIndex = teams.findIndex((t) => t.id === teamId);
    if (teamIndex === -1) throw new Error('Team not found');

    const newMilestone = {
      id: `m-${Date.now()}`,
      title: milestoneData.title,
      stage: milestoneData.stage || 'MVP Planning',
      targetDate: milestoneData.targetDate || 'TBD',
      completed: false,
      description: milestoneData.description || '',
    };

    teams[teamIndex].milestones.push(newMilestone);
    saveStoredTeams(teams);
    return newMilestone;
  },

  async toggleMilestone(teamId, milestoneId) {
    const teams = getStoredTeams();
    const teamIndex = teams.findIndex((t) => t.id === teamId);
    if (teamIndex === -1) throw new Error('Team not found');

    const mIndex = teams[teamIndex].milestones.findIndex((m) => m.id === milestoneId);
    if (mIndex === -1) throw new Error('Milestone not found');

    teams[teamIndex].milestones[mIndex].completed = !teams[teamIndex].milestones[mIndex].completed;

    // recalculate team progress
    const total = teams[teamIndex].milestones.length;
    const done = teams[teamIndex].milestones.filter((m) => m.completed).length;
    teams[teamIndex].progressPercentage = Math.round((done / total) * 100);

    saveStoredTeams(teams);
    return teams[teamIndex].milestones[mIndex];
  },

  async addDecisionLog(teamId, logData, author) {
    const teams = getStoredTeams();
    const teamIndex = teams.findIndex((t) => t.id === teamId);
    if (teamIndex === -1) throw new Error('Team not found');

    const newLog = {
      id: `d-${Date.now()}`,
      title: logData.title,
      description: logData.description,
      author: {
        name: author?.name || 'Alex Morgan',
        avatar: author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      },
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    teams[teamIndex].decisionLogs.unshift(newLog);
    saveStoredTeams(teams);
    return newLog;
  }
};
