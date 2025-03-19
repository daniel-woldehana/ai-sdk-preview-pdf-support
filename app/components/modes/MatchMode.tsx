'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '../../store/quizStore';

interface Card {
  id: string;
  content: string;
  type: 'question' | 'answer';
  matched: boolean;
}

export default function MatchMode() {
  const questions = useQuizStore((state) => state.questions);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (questions && questions.length > 0) {
      const shuffledCards = [...questions].flatMap((q, index) => [
        {
          id: `q${index}`,
          content: q.question,
          type: 'question' as const,
          matched: false
        },
        {
          id: `a${index}`,
          content: q.answer,
          type: 'answer' as const,
          matched: false
        }
      ]).sort(() => Math.random() - 0.5);
      
      setCards(shuffledCards);
    }
  }, [questions]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setCompleted(true);
    }
  }, [cards]);

  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">No questions available.</p>
      </div>
    );
  }

  const handleCardClick = (cardId: string) => {
    if (selectedCards.length === 2) return;
    
    const newSelectedCards = [...selectedCards, cardId];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const [first, second] = newSelectedCards;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard && secondCard) {
        const isMatch = 
          (firstCard.id[0] === 'q' && secondCard.id[0] === 'a' || 
           firstCard.id[0] === 'a' && secondCard.id[0] === 'q') &&
          firstCard.id.slice(1) === secondCard.id.slice(1);

        if (isMatch) {
          setCards(cards.map(card => 
            card.id === first || card.id === second
              ? { ...card, matched: true }
              : card
          ));
        }

        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`
              p-4 rounded-lg cursor-pointer
              ${card.matched ? 'bg-green-100' : 'bg-white'}
              ${selectedCards.includes(card.id) ? 'ring-2 ring-blue-500' : 'shadow-lg'}
            `}
            onClick={() => !card.matched && handleCardClick(card.id)}
            whileHover={{ scale: 1.02 }}
          >
            {card.content}
          </motion.div>
        ))}
      </div>

      {completed && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold text-green-600">
            Congratulations! You&apos;ve matched all the cards!
          </h3>
        </div>
      )}
    </div>
  );
} 