"use client"
import React from "react";

export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  width?: number;
  height?: number;
}

interface MasonryProps {
  items: MasonryItem[];
  columns?: number;
  gap?: number | string;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  columns = 3,
  gap = 16,
}) => {
  return (
    <div
      style={{
        columnCount: columns,
        columnGap: gap,
        width: "100%",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            breakInside: "avoid",
            marginBottom: gap,
            borderRadius: 10,
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => window.open(item.url, "_blank", "noopener")}
        >
          <img
            src={item.img}
            alt=""
            style={{
              width: "100%",
              height: item.height ?? 200,
              objectFit: "cover",
              display: "block",
              borderRadius: 10,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Masonry;

