'use client';

import { useState } from 'react';
import { useQuizStore } from '../../store/quizStore';

export default function LearnMode() {
  const questions = useQuizStore((state) => state.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showAnswer, setShowAnswer] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">No questions available.</p>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    setUserAnswers({ ...userAnswers, [currentIndex]: answer });
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold mb-4">
          {questions[currentIndex].question}
        </h3>
        
        <div className="space-y-4">
          <textarea
            className="w-full p-4 border rounded-lg"
            placeholder="Type your answer..."
            value={userAnswers[currentIndex] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
          />

          {showAnswer && (
            <div className="mt-4">
              <h4 className="font-semibold">Correct Answer:</h4>
              <p className="mt-2">{questions[currentIndex].answer}</p>
            </div>
          )}

          <button
            className="w-full py-2 bg-blue-600 text-white rounded-lg"
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            Next
          </button>
        </div>

        <div className="mt-4 text-center text-gray-600">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>
    </div>
  );
} 