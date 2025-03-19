'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SpeakerWaveIcon, 
  StarIcon, 
  ArrowsPointingOutIcon 
} from '@heroicons/react/24/outline';
import { useQuizStore } from '../../store/quizStore';

export default function FlashcardMode() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const questions = useQuizStore((state) => state.questions);

  // Handle case when no data is available
  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">No questions available.</p>
      </div>
    );
  }

  const handleFlip = () => setIsFlipped(!isFlipped);
  
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative h-[400px]">
        <AnimatePresence>
          <motion.div
            className="absolute w-full h-full"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ perspective: 1000 }}
          >
            <div 
              className="w-full h-full bg-white rounded-xl shadow-lg p-8 cursor-pointer"
              onClick={handleFlip}
            >
              <div className="flex justify-between mb-4">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(isFlipped ? questions[currentIndex].answer : questions[currentIndex].question);
                  }}
                >
                  <SpeakerWaveIcon className="w-6 h-6" />
                </button>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <StarIcon className="w-6 h-6" />
                  </button>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                  >
                    <ArrowsPointingOutIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center h-[280px]">
                <p 
                  className="text-xl text-center"
                  style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
                >
                  {isFlipped ? questions[currentIndex].answer : questions[currentIndex].question}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <span className="text-gray-600">
          {currentIndex + 1} / {questions.length}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
          disabled={currentIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
} 