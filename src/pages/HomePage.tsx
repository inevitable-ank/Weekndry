import React from 'react';
import { Hero } from '../components/home/hero';
import { MoodSelector } from '../components/home/mood-selector';
import { ActivityCards } from '../components/home/activity-cards';
import { MealIdeas } from '../components/home/meal-ideas';
import { Features } from '../components/home/features';

export const HomePage: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />
      
      {/* Mood Selector Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20"></div>
        <MoodSelector />
      </div>
      
      {/* Activity Cards Section */}
      <ActivityCards />
      
      {/* Meal Ideas Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent"></div>
        <MealIdeas />
      </div>
      
      {/* Features Section */}
      <Features />
    </div>
  );
};

