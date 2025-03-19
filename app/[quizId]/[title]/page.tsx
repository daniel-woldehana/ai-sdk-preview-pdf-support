'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import QuizNavigation from '../../components/QuizNavigation';
import FlashcardMode from '../../components/modes/FlashcardMode';
import LearnMode from '../../components/modes/LearnMode';
import TestMode from '../../components/modes/TestMode';
import MatchMode from '../../components/modes/MatchMode';

export default function QuizPage() {
  const params = useParams();
  const [activeMode, setActiveMode] = useState('Flashcards');

  const renderMode = () => {
    switch (activeMode) {
      case 'Flashcards':
        return <FlashcardMode />;
      case 'Learn':
        return <LearnMode />;
      case 'Test':
        return <TestMode />;
      case 'Match':
        return <MatchMode />;
      default:
        return <FlashcardMode />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {decodeURIComponent(params.title as string).replace(/-/g, ' ')}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Save
              </button>
              <button className="px-4 py-2 border rounded-lg">
                Share
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuizNavigation 
          activeMode={activeMode} 
          onModeChange={setActiveMode} 
        />
        <div className="mt-8">
          {renderMode()}
        </div>
      </main>
    </div>
  );
} 