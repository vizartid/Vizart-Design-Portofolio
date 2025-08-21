
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

export default function AnimatedCursorWrapper({
  innerSize = 8,
  outerSize = 35,
  color = '193, 11, 111',
  outerAlpha = 0.3,
  innerScale = 0.7,
  outerScale = 5,
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
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'input[type="password"]',
        'input[type="tel"]',
        'input[type="url"]',
        'input[type="search"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link',
        '.btn',
        '.cursor-pointer',
        '[role="button"]',
        '[tabindex]:not([tabindex="-1"])',
        '.clickable'
      ]}
    />
  );
}
