import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { PlannerPage } from './pages/PlannerPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SchedulePage } from './pages/SchedulePage';
// Removed DayViewPage

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage onStart={() => window.location.assign('/planner')} /></Layout>,
  },
  {
    path: '/schedule',
    element: <Layout><SchedulePage /></Layout>,
  },
  // Removed day view route
  {
    path: '/planner',
    element: <Layout><PlannerPage /></Layout>,
  },
  {
    path: '/settings',
    element: <Layout><SettingsPage /></Layout>,
  },
  {
    path: '*',
    element: <Layout><NotFoundPage /></Layout>,
  }
]);

export const AppRouter: React.FC = () => (
  <RouterProvider router={router} />
);

