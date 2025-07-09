// Carousel.tsx
"use client";

import React, { useRef, useLayoutEffect } from "react";

export interface Project {
  name: string;
  website?: string;
  github?: string;
  picture: string;
  description: string;
}

interface CarouselProps {
  projects: Project[];
  scrollSpeed?: number; // pixels per second
}

const Carousel: React.FC<CarouselProps> = ({
  projects,
  scrollSpeed = 30,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current!; // non-null assertion
    // measure twice-concatenated width
    const fullWidth = container.scrollWidth;
    const halfWidth = fullWidth / 2;

    let frameId = 0;
    let lastTime: number | null = null;

    function step(time: number) {
      if (lastTime !== null) {
        const delta = time - lastTime;
        const distance = (scrollSpeed * delta) / 1000; // px per frame
        container.scrollLeft += distance;

        // loop back when we've scrolled one copy’s width
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      lastTime = time;
      frameId = requestAnimationFrame(step);
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [projects, scrollSpeed]);

  return (
    <div
      ref={containerRef}
      className={`
        flex
        overflow-x-auto
        overflow-y-hidden     /* hide vertical scrollbar */
        whitespace-nowrap
        gap-4
        py-4 px-2

        /* hide the native scrollbar entirely */
        [&::-webkit-scrollbar]:hidden
        [scrollbar-width:none]
        [-ms-overflow-style:none]
      `}
    >
      {[...projects, ...projects].map((project, idx) => (
        <div
          key={idx}
          className="
            inline-block
            w-[300px] sm:w-[400px] md:w-[500px] lg:w-[550px]
            rounded-2xl
            bg-neutral-900
            shadow-lg
            p-4
          "
        >
          <div className="overflow-hidden rounded-xl mb-4">
            <img
              src={project.picture}
              alt={project.name}
              className="w-full h-40 object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-white mb-1">
            {project.name}
          </h3>
          <p className="text-sm text-neutral-400 mb-3">
            {project.description}
          </p>
          <div className="flex gap-2 text-sm">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="underline text-lime-400/70"
              >
                Website
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="underline text-neutral-400"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
