'use client'

import { MotionConfig } from 'framer-motion'

// Framer Motion skips transform and layout animations for visitors who
// ask their OS for reduced motion. Opacity fades still run.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
