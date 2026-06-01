import React from 'react';
import ScrollStack, { ScrollStackItem } from '@/components/ui/scroll-stack';
import { Sparkles, Layers, Move3D, Aperture, Focus, Orbit } from 'lucide-react';

// ============================================================================
// Types & Interfaces
// ============================================================================

interface CardData {
  title: string;
  icon: React.ReactNode;
  color: string;
  text: string;
}

// ============================================================================
// Constants
// ============================================================================

const ICON_CLASSES = 'w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white drop-shadow';

const DEMO_CARDS: CardData[] = [
  {
    title: 'Immersive Parallax',
    icon: <Sparkles className={ICON_CLASSES} />,
    color: 'from-indigo-500 via-violet-500 to-fuchsia-500',
    text: 'Smooth inertial scrolling experience using Lenis with GPU-accelerated transforms.',
  },
  {
    title: 'Stacked Depth',
    icon: <Layers className={ICON_CLASSES} />,
    color: 'from-sky-500 via-cyan-500 to-teal-500',
    text: 'Cards compress into a stack with progressive scale and optional blur depth cues.',
  },
  {
    title: 'Physics Feel',
    icon: <Move3D className={ICON_CLASSES} />,
    color: 'from-emerald-500 via-lime-500 to-yellow-400',
    text: 'Easing and lerp tuned to feel tangible and reduce jank on rapid wheel motion.',
  },
  {
    title: 'Adaptive Rotation',
    icon: <Aperture className={ICON_CLASSES} />,
    color: 'from-amber-500 via-orange-500 to-rose-500',
    text: 'Optional rotational accent per depth layer for added dimensionality.',
  },
  {
    title: 'Subtle Blur',
    icon: <Focus className={ICON_CLASSES} />,
    color: 'from-pink-500 via-rose-500 to-red-500',
    text: 'Foreground focus is emphasized using configurable Gaussian blur falloff.',
  },
  {
    title: 'Orbital Motion',
    icon: <Orbit className={ICON_CLASSES} />,
    color: 'from-violet-600 via-purple-600 to-indigo-600',
    text: 'Composable API adjust distance, scaling slope, rotation, blur, and completion callback.',
  },
];

// ============================================================================
// Header Section Component
// ============================================================================

function HeaderSection(): JSX.Element {
  return (
    <div className="h-[40vh] sm:h-[50vh] flex flex-col items-center justify-center text-center px-4 sm:px-6">
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600">
        Scroll Stack Demo
      </h1>
      <p className="mt-3 sm:mt-4 max-w-xl sm:max-w-2xl text-neutral-600 text-sm sm:text-base lg:text-lg px-2">
        An interactive scroll experience built with Lenis + React + Tailwind.
        <span className="hidden sm:inline"> Scroll down to feel the layered compression effect.</span>
      </p>
    </div>
  );
}

// ============================================================================
// Demo Card Component
// ============================================================================

interface DemoCardProps {
  card: CardData;
}

function DemoCard({ card }: DemoCardProps): JSX.Element {
  return (
    <div
      className={`
        relative h-full w-full rounded-2xl sm:rounded-[30px] 
        bg-gradient-to-br ${card.color} 
        flex flex-col items-center justify-center 
        text-white select-none p-4 sm:p-6
      `}
    >
      {/* Overlay */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-[30px] opacity-30 mix-blend-overlay" />

      {/* Content */}
      <div className="flex flex-col items-center gap-2 sm:gap-4 z-10 text-center">
        {card.icon}
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight">
          {card.title}
        </h2>
        <p className="max-w-xs sm:max-w-sm text-center text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
          {card.text}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Scroll Stack Demo Section Component
// ============================================================================

function ScrollStackSection(): JSX.Element {
  const handleStackComplete = () => {
    // Stack animation completed
  };

  return (
    <div className="h-[60vh] sm:h-[50vh]">
      <ScrollStack
        itemDistance={80}
        baseScale={0.8}
        itemScale={0.05}
        rotationAmount={3}
        blurAmount={1.5}
        onStackComplete={handleStackComplete}
      >
        {DEMO_CARDS.map((card, i) => (
          <ScrollStackItem key={i}>
            <DemoCard card={card} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}

// ============================================================================
// Main Demo Page Component
// ============================================================================

export default function DemoScrollStackPage(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSection />
      <ScrollStackSection />
    </div>
  );
}
