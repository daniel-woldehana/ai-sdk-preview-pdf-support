'use client';

import { create } from 'zustand';

interface Question {
  question: string;
  answer: string;
}

interface QuizStore {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
}

// Initial test data
const initialQuestions = [
  {
    question: "What is compound interest?",
    answer: "Interest calculated on both the initial principal and accumulated interest from previous periods."
  },
  {
    question: "What is diversification?",
    answer: "A risk management strategy that mixes a variety of investments within a portfolio."
  },
  {
    question: "What is a bull market?",
    answer: "A financial market condition in which prices are rising or expected to rise."
  }
];

export const useQuizStore = create<QuizStore>((set) => ({
  questions: initialQuestions, // Set initial test data
  setQuestions: (questions) => set({ questions }),
})); 