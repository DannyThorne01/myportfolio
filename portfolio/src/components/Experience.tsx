"use client"
import UsMapDeck from "./Map";

import React, { useState, useMemo } from "react";
import Masonry from './Masonry';

const STATE_ITEMS:any = {
  'New York': [
    { id: 'ny1', img: '/me.png', url: '#', width: 30, height: 200 },
    { id: 'ny2', img: '/dls1.jpg', url: '#', width: 30, height: 230 },
    { id: 'ny3', img: '/sf1.jpg', url: '#', width: 30, height: 180 },
    { id: 'ny4', img: '/chi1.jpg', url: '#', width: 30, height: 120 },
  ],
  California: [
    { id: 'sf1', img: '/lulc.png', url: '#', width: 50, height: 300 },
    { id: 'ny1', img: '/me.png', url: '#', width: 30, height: 200 },
    { id: 'ny2', img: '/dls1.jpg', url: '#', width: 30, height: 230 },
    { id: 'ny3', img: '/sf1.jpg', url: '#', width: 30, height: 180 },
    { id: 'ny4', img: '/chi1.jpg', url: '#', width: 30, height: 120 },
  ],
}

const DEFAULT_ITEMS = [
  { id: "1", img: "/dog.jpg", url: "#", width: 30, height: 200 },

];


const Experience = ()=> {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const items = useMemo(() => {
  if (selectedState && STATE_ITEMS[selectedState]) {
    return STATE_ITEMS[selectedState];
  }
  return DEFAULT_ITEMS;
}, [selectedState]);
console.log(items)
  return (
   <section className="px-4 sm:px-8 py-8">  
  <div className="grid gap-6 grid-cols-1 md:grid-cols-[3fr_2fr]">
    <div className="h-[50vh] md:h-[70vh] overflow-hidden rounded-xl shadow-lg">
      <UsMapDeck onStateSelect={setSelectedState}/>
    </div> 

    {/* hide on mobile, show at md+ */}
    <aside className="hidden md:block h-[60vh] md:h-[70vh] bg-neutral-900 rounded-xl shadow-lg p-4 overflow-auto">
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={0.95}
        blurToFocus
        colorShiftOnHover={false}
      />
    </aside>
  </div>      
</section>


  );
}

export default Experience 