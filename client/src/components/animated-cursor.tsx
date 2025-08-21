import React from "react";
import AnimatedCursor from "react-animated-cursor";

interface AnimatedCursorWrapperProps {
  innerSize?: number;
  outerSize?: number;
  color?: string;
  outerAlpha?: number;
  innerScale?: number;
  outerScale?: number;
  trailingSpeed?: number;
  hasBlendMode?: boolean;
  showSystemCursor?: boolean;
}

// Optimized clickable selectors - reduced to essential ones for better performance
const CLICKABLE_SELECTORS = [
  'button',
  'a',
  '[role="button"]',
  '.clickable',
  'input',
  'textarea',
  'select'
];

export default function AnimatedCursorWrapper({
  innerSize = 8,
  outerSize = 35,
  color = '0, 0, 0',
  outerAlpha = 0.3,
  innerScale = 0.7,
  outerScale = 2.5,
  trailingSpeed = 8,
  hasBlendMode = true,
  showSystemCursor = false
}: AnimatedCursorWrapperProps) {
  return (
    <AnimatedCursor
      innerSize={innerSize}
      outerSize={outerSize}
      color={color}
      outerAlpha={outerAlpha}
      innerScale={innerScale}
      outerScale={outerScale}
      trailingSpeed={trailingSpeed}
      hasBlendMode={hasBlendMode}
      showSystemCursor={showSystemCursor}
      clickables={CLICKABLE_SELECTORS}
    />
  );
}