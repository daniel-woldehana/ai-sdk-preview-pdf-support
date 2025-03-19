import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SpeakerWaveIcon, StarIcon, ArrowsPointingOutIcon, ShareIcon } from '@heroicons/react/24/outline';

interface FlashCardProps {
  question: string;
  answer: string;
  currentCard: number;
  totalCards: number;
  onNext: () => void;
  onPrevious: () => void;
}

export default function FlashCard({
  question,
  answer,
  currentCard,
  totalCards,
  onNext,
  onPrevious,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Finance Quiz 1</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ShareIcon className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowsPointingOutIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-8">
        {['Flashcards', 'Learn', 'Test', 'Match'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg ${
              tab === 'Flashcards' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative h-[400px] w-full">
        <AnimatePresence>
          <motion.div
            className="absolute w-full h-full"
            onClick={handleFlip}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ perspective: 1000 }}
          >
            <div className="w-full h-full bg-white rounded-xl shadow-lg p-8 relative">
              <div className="flex justify-between mb-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <SpeakerWaveIcon className="w-6 h-6" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <StarIcon className={`w-6 h-6 ${isBookmarked ? 'fill-yellow-400' : ''}`} />
                </button>
              </div>
              <div className="flex items-center justify-center h-[280px]">
                <p className="text-xl text-center" style={{ 
                  transform: isFlipped ? 'rotateY(180deg)' : 'none'
                }}>
                  {isFlipped ? answer : question}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={onPrevious}
          className="px-4 py-2 bg-gray-100 rounded-lg"
          disabled={currentCard === 1}
        >
          Previous
        </button>
        <span className="text-gray-600">
          {currentCard} / {totalCards}
        </span>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-gray-100 rounded-lg"
          disabled={currentCard === totalCards}
        >
          Next
        </button>
      </div>
    </div>
  );
} 