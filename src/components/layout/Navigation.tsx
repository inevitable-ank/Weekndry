import React from 'react';
import { NavLink } from 'react-router-dom';

const linkBase = 'px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500';

export const Navigation: React.FC = () => {
  return (
    <nav className="flex items-center gap-2">
      <NavLink
        to="/"
        className={({ isActive }) => `${linkBase} ${isActive ? 'bg-black/10 text-gray-900' : 'text-gray-600 hover:bg-black/5'}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/planner"
        className={({ isActive }) => `${linkBase} ${isActive ? 'bg-black/10 text-gray-900' : 'text-gray-600 hover:bg-black/5'}`}
      >
        Planner
      </NavLink>
      <NavLink
        to="/calendar"
        className={({ isActive }) => `${linkBase} ${isActive ? 'bg-black/10 text-gray-900' : 'text-gray-600 hover:bg-black/5'}`}
      >
        Calendar
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => `${linkBase} ${isActive ? 'bg-black/10 text-gray-900' : 'text-gray-600 hover:bg-black/5'}`}
      >
        Settings
      </NavLink>
      <NavLink
        to="/schedule"
        className={({ isActive }) => `${linkBase} ${isActive ? 'bg-black/10 text-gray-900' : 'text-gray-600 hover:bg-black/5'}`}
      >
        Schedule
      </NavLink>
    </nav>
  );
};

