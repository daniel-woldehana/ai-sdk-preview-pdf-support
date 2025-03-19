'use client';

import { useState, useEffect } from 'react';
import { useQuizStore } from '../../store/quizStore';

export default function TestMode() {
  const questions = useQuizStore((state) => state.questions);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setAnswers(new Array(questions.length).fill(''));
    }
  }, [questions]);

  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">No questions available.</p>
      </div>
    );
  }

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              {index + 1}. {question.question}
            </h3>
            <textarea
              className="w-full p-4 border rounded-lg"
              placeholder="Your answer..."
              value={answers[index]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index] = e.target.value;
                setAnswers(newAnswers);
              }}
              disabled={submitted}
            />
            {submitted && (
              <div className="mt-4">
                <h4 className="font-semibold">Correct Answer:</h4>
                <p className="mt-2">{question.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!submitted && (
        <button
          className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg"
          onClick={handleSubmit}
        >
          Submit Test
        </button>
      )}
    </div>
  );
} 