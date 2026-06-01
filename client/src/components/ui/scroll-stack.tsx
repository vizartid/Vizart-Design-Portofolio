import React, { 
  useLayoutEffect, 
  useRef, 
  useCallback, 
  ReactNode, 
  CSSProperties 
} from "react";
import Lenis from "lenis";

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  /** Distance between cards (margin-bottom) */
  itemDistance?: number;
  /** Scale reduction per item */
  itemScale?: number;
  /** Stacking distance when pinned */
  itemStackDistance?: number;
  /** Stack position (px or % relative to container height) */
  stackPosition?: string | number;
  /** Scale end position */
  scaleEndPosition?: string | number;
  /** Base scale for the topmost card */
  baseScale?: number;
  /** Animation timing (reserved for future use) */
  scaleDuration?: number;
  /** Incremental rotation in degrees */
  rotationAmount?: number;
  /** Incremental blur between depth layers */
  blurAmount?: number;
  /** Callback when last card is in active range */
  onStackComplete?: () => void;
}

interface TransformState {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
}

// ============================================================================
// ScrollStackItem Component
// ============================================================================

export const ScrollStackItem = ({ 
  children, 
  itemClassName = "" 
}: ScrollStackItemProps): JSX.Element => {
  const cardStyle: CSSProperties = {
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
  };

  return (
    <div
      className={`scroll-stack-card relative w-full my-4 sm:my-6 lg:my-8 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl lg:rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
      style={cardStyle}
    >
      {children}
    </div>
  );
};

// ============================================================================
// ScrollStack Component
// ============================================================================

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}: ScrollStackProps): JSX.Element => {
  // Refs
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const lastTransformsRef = useRef<Map<number, TransformState>>(new Map());
  const isUpdatingRef = useRef(false);

  // ============================================================================
  // Utility Functions
  // ============================================================================

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number): number => {
      if (scrollTop < start) return 0;
      if (scrollTop > end) return 1;
      return (scrollTop - start) / (end - start);
    },
    []
  );

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number): number => {
      if (typeof value === 'string' && value.includes('%')) {
        return (parseFloat(value) / 100) * containerHeight;
      }
      return typeof value === 'number' ? value : parseFloat(value);
    },
    []
  );

  // ============================================================================
  // Card Transform Update Logic
  // ============================================================================

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    
    const endElement = scroller.querySelector('.scroll-stack-end') as HTMLElement | null;
    const endElementTop = endElement?.offsetTop ?? 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const pinEnd = endElementTop - containerHeight / 2;

      // Calculate scale
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      
      // Calculate rotation
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Calculate blur based on depth
      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardsRef.current[j].offsetTop;
          const jTriggerStart = jCardTop - stackPositionPx - (itemStackDistance * j);
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      // Calculate translateY
      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      // Round values for performance
      const newTransform: TransformState = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      // Check if transform has changed significantly
      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged = !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      // Apply transform only if changed
      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      // Handle stack complete callback
      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  // ============================================================================
  // Scroll Handler
  // ============================================================================

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  // ============================================================================
  // Lenis Setup
  // ============================================================================

  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const innerContent = scroller.querySelector('.scroll-stack-inner') as HTMLElement;
    if (!innerContent) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: innerContent,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  // ============================================================================
  // Effect: Initialize Cards and Lenis
  // ============================================================================

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Get all cards
    const cards = Array.from(
      scroller.querySelectorAll<HTMLDivElement>(".scroll-stack-card")
    );
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    // Initialize card styles
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      (card.style as CSSProperties & { webkitTransform: string }).webkitTransform = 'translateZ(0)';
      (card.style as CSSProperties & { perspective: string }).perspective = '1000px';
      (card.style as CSSProperties & { webkitPerspective: string }).webkitPerspective = '1000px';
    });

    // Setup Lenis smooth scroll
    setupLenis();

    // Initial transform update
    updateCardTransforms();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
  ]);

  // ============================================================================
  // Render
  // ============================================================================

  const scrollerStyle: CSSProperties = {
    overscrollBehavior: 'contain',
    WebkitOverflowScrolling: 'touch',
    scrollBehavior: 'smooth',
    WebkitTransform: 'translateZ(0)',
    transform: 'translateZ(0)',
    willChange: 'scroll-position',
  };

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-hidden ${className}`.trim()}
      ref={scrollerRef}
      style={scrollerStyle}
    >
      <div className="scroll-stack-inner pt-[10vh] sm:pt-[15vh] lg:pt-[20vh] px-4 sm:px-8 lg:px-20 pb-[30rem] sm:pb-[40rem] lg:pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
