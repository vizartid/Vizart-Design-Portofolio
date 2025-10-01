import React from 'react';
import ScrollStack, { ScrollStackItem } from '@/components/ui/scroll-stack';
import { Sparkles, Layers, Move3D, Aperture, FlipHorizontal, Orbit, Focus } from 'lucide-react';

const iconClasses = 'w-12 h-12 text-white drop-shadow';

const DemoScrollStackPage = () => {
  const cards = [
    {
      title: 'Immersive Parallax',
      icon: <Sparkles className={iconClasses} />,
      color: 'from-indigo-500 via-violet-500 to-fuchsia-500',
      text: 'Smooth inertial scrolling experience using Lenis with GPU-accelerated transforms.'
    },
    {
      title: 'Stacked Depth',
      icon: <Layers className={iconClasses} />,
      color: 'from-sky-500 via-cyan-500 to-teal-500',
      text: 'Cards compress into a stack with progressive scale and optional blur depth cues.'
    },
    {
      title: 'Physics Feel',
      icon: <Move3D className={iconClasses} />,
      color: 'from-emerald-500 via-lime-500 to-yellow-400',
      text: 'Easing & lerp tuned to feel tangible and reduce jank on rapid wheel motion.'
    },
    {
      title: 'Adaptive Rotation',
      icon: <Aperture className={iconClasses} />,
      color: 'from-amber-500 via-orange-500 to-rose-500',
      text: 'Optional rotational accent per depth layer for added dimensionality.'
    },
    {
      title: 'Subtle Blur',
      icon: <Focus className={iconClasses} />,
      color: 'from-pink-500 via-rose-500 to-red-500',
      text: 'Foreground focus is emphasized using configurable Gaussian blur falloff.'
    },
    {
      title: 'Orbital Motion',
      icon: <Orbit className={iconClasses} />,
      color: 'from-violet-600 via-purple-600 to-indigo-600',
      text: 'Composable API: adjust distance, scaling slope, rotation, blur, and completion callback.'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600">Scroll Stack Demo</h1>
        <p className="mt-4 max-w-2xl text-neutral-600">An interactive scroll experience built with Lenis + React + Tailwind. Scroll down to feel the layered compression effect.</p>
      </div>
      <div className="h-[50vh]">
        <ScrollStack
          itemDistance={120}
          baseScale={0.8}
          itemScale={0.05}
          rotationAmount={3}
          blurAmount={1.5}
          onStackComplete={() => console.log('Stack complete!')}
        >
          {cards.map((c, i) => (
            <ScrollStackItem key={i}>
              <div className={`relative h-full w-full rounded-[30px] bg-gradient-to-br ${c.color} flex flex-col items-center justify-center text-white select-none`}>                
                <div className="absolute inset-0 rounded-[30px] opacity-30 mix-blend-overlay" />
                <div className="flex flex-col items-center gap-4 z-10">
                  {c.icon}
                  <h2 className="text-2xl font-semibold tracking-tight">{c.title}</h2>
                  <p className="max-w-sm text-center text-sm md:text-base text-white/90 leading-relaxed">{c.text}</p>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
};

export default DemoScrollStackPage;
