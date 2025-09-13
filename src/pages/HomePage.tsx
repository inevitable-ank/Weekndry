import React from 'react';
import { Hero } from '../components/home/hero';
import { MoodSelector } from '../components/home/mood-selector';
import { ActivityCards } from '../components/home/activity-cards';
import { MealIdeas } from '../components/home/meal-ideas';
import { Features } from '../components/home/features';
import { Button } from '../components/ui';
import { ArrowRight, Sparkles } from 'lucide-react';

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
      
      {/* Final Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-8">
            <Sparkles className="h-4 w-4" />
            Ready to Get Started?
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance mb-6">
            Your Perfect Weekend Awaits
          </h2>
          <p className="text-lg text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Join thousands of people who are already planning amazing weekends. 
            Start creating your personalized weekend experience today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={onStart} className="h-12 px-8 text-base font-semibold">
              Start Planning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
              View Examples
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

