"use client"
import UsMapDeck from "./Map";

import React, { useState, useMemo } from "react";
import Masonry from './molecules/Masonry';

const CITY_ITEMS:any = {
  Ithaca: [
    { id: 'ny1', img: '/me.png', url: '#', width: 30, height: 200 },
    { id: 'ny2', img: '/dls1.jpg', url: '#', width: 30, height: 230 },
    { id: 'ny3', img: '/sf1.jpg', url: '#', width: 30, height: 180 },
    { id: 'ny4', img: '/chi1.jpg', url: '#', width: 30, height: 120 },
  ],
  'San Francisco': [
    { id: 'sf1', img: '/lulc.png', url: '#', width: 50, height: 300 },
    { id: 'ny1', img: '/me.png', url: '#', width: 30, height: 200 },
    { id: 'ny2', img: '/dls1.jpg', url: '#', width: 30, height: 230 },
    { id: 'ny3', img: '/sf1.jpg', url: '#', width: 30, height: 180 },
    { id: 'ny4', img: '/chi1.jpg', url: '#', width: 30, height: 120 },
  ],
 Boston: [
    { id: 'bstn1', img: '/mitll/im6.JPG', url: '#', width: 50, height: 300 },
    { id: 'bstn2', img: '/mitll/im2.JPG', url: '#', width: 30, height: 200 },
    { id: 'bstn3', img: '/mitll/im3.JPG', url: '#', width: 30, height: 230 },
    { id: 'bstn4', img: '/mitll/im4.JPG', url: '#', width: 30, height: 180 },
    { id: 'bstn5', img: '/mitll/im5.JPG', url: '#', width: 30, height: 120 },
    { id: 'ny4', img: '/chi1.jpg', url: '#', width: 30, height: 120 },

  ],

}

const DEFAULT_ITEMS = [
  { id: "1", img: "/dog.jpg", url: "#", width: 30, height: 200 },

];


const Experience = ()=> {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const items = useMemo(() => {
  if (selectedCity && CITY_ITEMS[selectedCity]) {
    return CITY_ITEMS[selectedCity];
  }
  return DEFAULT_ITEMS;
}, [selectedCity]);
console.log(selectedCity)
  return (
   <section id ="about" className="px-4 sm:px-8 py-8">  
   <h2 className="text-2xl font-bold mb-5">Beyond School</h2>
   <p className="text-xl mb-5"> A mapped guide describing my life over the past four years!</p>
  <div className="grid gap-6 grid-cols-1 md:grid-cols-[3fr_2fr]">
    <div className="h-[50vh] md:h-[70vh] overflow-hidden rounded-xl shadow-lg">
      <UsMapDeck onCitySelect={setSelectedCity}/>
    </div> 
    <aside className="hidden md:block h-[60vh] md:h-[70vh] bg-neutral-900 rounded-xl shadow-lg p-4 overflow-auto">
      <Masonry items={items} columns={3} gap={16}/>

    </aside>
  </div>      
</section>


  );
}

export default Experience 