"use client";

import React from "react";
import Image from "next/image"

export interface Project {
  name: string;
  website?: string;
  github?: string;
  picture: string;
  description: string;
}

interface CarouselProps {
  projects: Project[];
}

const Carousel: React.FC<CarouselProps> = ({ projects }) => {
  return (
    <div
      className={`
        flex
        overflow-x-auto
        overflow-y-hidden
        gap-4
        py-4 px-2
        snap-x snap-mandatory
        [&::-webkit-scrollbar]:hidden
        [scrollbar-width:none]
        [-ms-overflow-style:none]
      `}
    >
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="
            flex-shrink-0
            snap-center
            w-[280px] sm:w-[320px] md:w-[360px]
            rounded-2xl
            bg-neutral-900
            shadow-lg
            p-4
            whitespace-normal
            break-words
          "
        >
          <div className="overflow-hidden rounded-xl mb-4">
            <Image
              src={project.picture}
              alt={project.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 break-words">
            {project.name}
          </h3>
          <p className="text-sm text-neutral-400 mb-3 break-words">
            {project.description}
          </p>
          <div className="flex gap-2 text-sm flex-wrap">
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

