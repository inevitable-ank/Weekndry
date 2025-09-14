import React from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { PlannerPage } from './pages/PlannerPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SchedulePage } from './pages/SchedulePage';
import { DayViewPage } from './pages/DayViewPage';
import { CalendarPage } from './pages/CalendarPage';

// Wrapper component to use navigate hook
const HomePageWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <HomePage onStart={() => navigate('/planner')} />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePageWrapper /></Layout>,
  },
  {
    path: '/schedule',
    element: <Layout><SchedulePage /></Layout>,
  },
  {
    path: '/weekend',
    element: <Layout><DayViewPage /></Layout>,
  },
  {
    path: '/day/:day',
    element: <Layout><DayViewPage /></Layout>,
  },
  {
    path: '/planner',
    element: <Layout><PlannerPage /></Layout>,
  },
  {
    path: '/calendar',
    element: <Layout><CalendarPage /></Layout>,
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

