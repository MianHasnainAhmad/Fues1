import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { AboutPage } from '../pages/public/AboutPage';
import { CommunityPage } from '../pages/public/CommunityPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';

// Authenticated Pages
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { IdeasFeedPage } from '../pages/ideas/IdeasFeedPage';
import { CreateIdeaPage } from '../pages/ideas/CreateIdeaPage';
import { IdeaDetailPage } from '../pages/ideas/IdeaDetailPage';
import { AICompanionPage } from '../pages/ai/AICompanionPage';
import { CollaboratorsPage } from '../pages/collaborators/CollaboratorsPage';
import { UserProfilePage } from '../pages/profile/UserProfilePage';
import { MyProfilePage } from '../pages/profile/MyProfilePage';
import { CollaborationRequestsPage } from '../pages/collaborators/CollaborationRequestsPage';
import { TeamWorkspacePage } from '../pages/teams/TeamWorkspacePage';
import { MessagesPage } from '../pages/messages/MessagesPage';
import { NotificationsPage } from '../pages/notifications/NotificationsPage';
import { SavedIdeasPage } from '../pages/ideas/SavedIdeasPage';
import { MyIdeasPage } from '../pages/ideas/MyIdeasPage';
import { SettingsPage } from '../pages/settings/SettingsPage';

// Admin Routes
import { renderAdminRoutes } from './AdminRoutes';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Marketing & Community Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/community" element={<CommunityPage />} />

      {/* Authentication Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Authenticated Dashboard & Feature Workspace */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ideas" element={<IdeasFeedPage />} />
        <Route path="/ideas/create" element={<CreateIdeaPage />} />
        <Route path="/ideas/:id" element={<IdeaDetailPage />} />
        <Route path="/ai-companion" element={<AICompanionPage />} />
        <Route path="/collaborators" element={<CollaboratorsPage />} />
        <Route path="/profile/:id" element={<UserProfilePage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/requests" element={<CollaborationRequestsPage />} />
        <Route path="/teams/:id" element={<TeamWorkspacePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/saved" element={<SavedIdeasPage />} />
        <Route path="/my-ideas" element={<MyIdeasPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Admin Control Plane Routes */}
      {renderAdminRoutes()}

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
