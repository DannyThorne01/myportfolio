// src/components/TypewriterText.tsx
'use client';

import { useState, useEffect } from 'react';

type Props = {
  text: string;
  className?: string;
  mobileSpeed?: number;   // ms per char (base)
  desktopSpeed?: number;  // ms per char (≥ 640 px)
};

export default function TypewriterText({
  text,
  className = '',
  mobileSpeed = 40,
  desktopSpeed = 20,
}: Props) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    const speed =
      window.innerWidth >= 640 ? desktopSpeed : mobileSpeed;

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, mobileSpeed, desktopSpeed]);

  return (
    <p className={`whitespace-pre-wrap font-mono ${className}`}>
      {shown}
      <span className="animate-pulse">|</span>
    </p>
  );
}