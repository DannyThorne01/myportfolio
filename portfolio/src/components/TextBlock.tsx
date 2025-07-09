"use client";

import React from "react";

export interface ExperienceItemProps {
  timeframe: string;
  title: string;
  company: {
    name: string;
    url?: string;
  };
  description: React.ReactNode; 
  tags: string[];
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  timeframe,
  title,
  company,
  description,
  tags,
}) => (
  <div className="mb-8 px-5 flex flex-wrap lg:justify-center">
    {/* Date / timeframe */}
    <div className="w-full lg:w-1/4">
      <p className="mb-2 text-sm text-neutral-400">{timeframe}</p>
    </div>

    {/* Content */}
    <div className="w-full max-w-xl lg:w-3/4">
      {/* Title + Company */}
      <h3 className="mb-2 font-semibold text-lg flex items-center flex-wrap">
        {title}
        {company.url ? (
          <a
            href={company.url}
            target="_blank"
            rel="noreferrer"
            className="ml-2 rounded bg-neutral-900 px-2 py-1 text-sm font-semibold text-lime-400/70 hover:bg-neutral-800 transition"
          >
            {company.name}
          </a>
        ) : (
          <span className="ml-2 rounded bg-neutral-900 px-2 py-1 text-sm font-semibold text-lime-400/70">
            {company.name}
          </span>
        )}
      </h3>

      {/* Description */}
      <p className="mb-4 text-neutral-400">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap mt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="mr-2 mb-2 rounded bg-neutral-900 px-2 py-1 text-sm font-semibold text-lime-400/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default ExperienceItem;
