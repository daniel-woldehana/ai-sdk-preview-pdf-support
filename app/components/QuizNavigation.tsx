'use client';

import { Tab } from '@headlessui/react';
import { 
  BookOpenIcon, 
  PencilSquareIcon, 
  PuzzlePieceIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const tabs = [
  { name: 'Flashcards', icon: DocumentTextIcon },
  { name: 'Learn', icon: BookOpenIcon },
  { name: 'Test', icon: PencilSquareIcon },
  { name: 'Match', icon: PuzzlePieceIcon },
];

export default function QuizNavigation({ activeMode, onModeChange }: {
  activeMode: string;
  onModeChange: (mode: string) => void;
}) {
  return (
    <Tab.Group onChange={(index) => onModeChange(tabs[index].name)}>
      <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              `flex items-center space-x-2 w-full rounded-lg py-2.5 px-3 text-sm font-medium leading-5
              ${selected
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              }`
            }
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.name}</span>
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
} 