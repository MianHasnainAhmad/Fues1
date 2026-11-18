import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { ProtectedAdminRoute } from '../components/admin/ProtectedAdminRoute';
import { AdminLayout } from '../components/admin/layout/AdminLayout';

// Auth Pages
import { AdminLoginPage } from '../pages/admin/auth/AdminLoginPage';
import { AdminForgotPasswordPage } from '../pages/admin/auth/AdminForgotPasswordPage';

// Admin Core Pages
import { AdminDashboardPage } from '../pages/admin/dashboard/AdminDashboardPage';
import { AdminUsersPage } from '../pages/admin/users/AdminUsersPage';
import { AdminUserDetailPage } from '../pages/admin/users/AdminUserDetailPage';
import { AdminIdeasPage } from '../pages/admin/ideas/AdminIdeasPage';
import { AdminIdeaDetailPage } from '../pages/admin/ideas/AdminIdeaDetailPage';
import { AdminModerationPage } from '../pages/admin/moderation/AdminModerationPage';
import { AdminCollaborationsPage } from '../pages/admin/collaborations/AdminCollaborationsPage';
import { AdminTeamsPage } from '../pages/admin/teams/AdminTeamsPage';
import { AdminTeamDetailPage } from '../pages/admin/teams/AdminTeamDetailPage';
import { AdminAIMonitoringPage } from '../pages/admin/ai/AdminAIMonitoringPage';
import { AdminCategoriesPage } from '../pages/admin/categories/AdminCategoriesPage';
import { AdminReputationPage } from '../pages/admin/reputation/AdminReputationPage';
import { AdminNotificationsPage } from '../pages/admin/notifications/AdminNotificationsPage';
import { AdminAnalyticsPage } from '../pages/admin/analytics/AdminAnalyticsPage';
import { AdminActivityLogsPage } from '../pages/admin/logs/AdminActivityLogsPage';
import { AdminSettingsPage } from '../pages/admin/settings/AdminSettingsPage';
import { AdminProfilePage } from '../pages/admin/profile/AdminProfilePage';

export const renderAdminRoutes = () => [
  <Route key="admin-login" path="/admin/login" element={<AdminLoginPage />} />,
  <Route key="admin-forgot" path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />,
  <Route
    key="admin-root"
    path="/admin"
    element={
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    }
  >
    <Route index element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="dashboard" element={<AdminDashboardPage />} />
    <Route path="users" element={<AdminUsersPage />} />
    <Route path="users/:id" element={<AdminUserDetailPage />} />
    <Route path="ideas" element={<AdminIdeasPage />} />
    <Route path="ideas/:id" element={<AdminIdeaDetailPage />} />
    <Route path="moderation" element={<AdminModerationPage />} />
    <Route path="collaborations" element={<AdminCollaborationsPage />} />
    <Route path="teams" element={<AdminTeamsPage />} />
    <Route path="teams/:id" element={<AdminTeamDetailPage />} />
    <Route path="ai-monitoring" element={<AdminAIMonitoringPage />} />
    <Route path="categories" element={<AdminCategoriesPage />} />
    <Route path="reputation" element={<AdminReputationPage />} />
    <Route path="notifications" element={<AdminNotificationsPage />} />
    <Route path="analytics" element={<AdminAnalyticsPage />} />
    <Route path="activity-logs" element={<AdminActivityLogsPage />} />
    <Route path="settings" element={<AdminSettingsPage />} />
    <Route path="profile" element={<AdminProfilePage />} />
  </Route>,
];

export default renderAdminRoutes;
