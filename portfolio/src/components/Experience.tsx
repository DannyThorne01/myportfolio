"use client"
import UsMapDeck from "./Map";

import React, { useState, useMemo } from "react";
import Masonry from './molecules/Masonry';

const CITY_ITEMS:any = {
  Ithaca: [
   { id: 'ny1', img: '/ithaca/im1.jpg', url: '#', width: 50, height: 300 },
   { id: 'ny2', img: '/ithaca/im2.JPG', url: '#', width: 50, height: 200},
   { id: 'ny3', img: '/ithaca/im3.JPG', url: '#', width: 50, height: 230 },
   { id: "ny4", img: "/ithaca/im4.jpg", url: "#", width: 30, height: 200 },
   { id: "ny5", img: "/ithaca/im5.JPG", url: "#", width: 30, height: 180 },
  ],
  'San Francisco': [
    { id: 'sf1', img: '/sf/im1.JPG', url: '#', width: 50, height: 300 },
    { id: 'sf2', img: '/sf/im2.JPG', url: '#', width: 30, height: 200 },
    { id: 'sf3', img: '/sf/im3.JPG', url: '#', width: 30, height: 230 },
    { id: 'sf4', img: '/sf/im4.JPG', url: '#', width: 30, height: 180 },
    
  ],
  'San Diego' :[
    { id: 'sd1', img: '/sd/im1.JPG', url: '#', width: 50, height: 300 },
    { id: 'sd2', img: '/sd/im2.JPG', url: '#', width: 50, height: 240 },
    { id: 'sd3', img: '/sd/im3.JPG', url: '#', width: 60, height: 180 },
    { id: 'sd4', img: '/sd/im4.JPG', url: '#', width: 50, height: 200 },
    { id: 'sd5', img: '/sd/im5.JPG', url: '#', width: 50, height: 120 },
  ],
 Boston: [
    { id: 'bstn1', img: '/mitll/im6.JPG', url: '#', width: 50, height: 300 },
    { id: 'bstn2', img: '/mitll/im2.JPG', url: '#', width: 30, height: 200 },
    { id: 'bstn3', img: '/mitll/im3.JPG', url: '#', width: 30, height: 230 },
    { id: 'bstn4', img: '/mitll/im4.JPG', url: '#', width: 30, height: 180 },
    { id: 'bstn5', img: '/mitll/im5.JPG', url: '#', width: 30, height: 120 },

  ],
  Dallas: [
    { id: 'dallas1', img: '/dallas/im1.JPG', url: '#', width: 50, height: 300 },
    { id: 'dallas2', img: '/dallas/im2.JPG', url: '#', width: 30, height: 200 },
    { id: 'dallas3', img: '/dallas/im3.JPG', url: '#', width: 30, height: 230 },
    { id: 'dallas4', img: '/dallas/im4.JPG', url: '#', width: 30, height: 180 },
  ],
  Chicago:[
    { id: 'nsbe1', img: '/nsbe/im6.JPG', url: '#', width: 50, height: 120 },

    { id: 'nsbe3', img: '/nsbe/im3.jpg', url: '#', width: 60, height: 240 },
    { id: 'nsbe4', img: '/nsbe/im4.JPG', url: '#', width: 50, height: 180 },
    { id: 'nsbe5', img: '/nsbe/im5.JPG', url: '#', width: 20, height: 100 },
    { id: 'nsbe6', img: '/nsbe/im1.jpg', url: '#', width: 10, height: 200 },
  ]



}

const DEFAULT_ITEMS = [
  { id: "1", img: "/default/im1.jpg", url: "#", width: 30, height: 200 },
  { id: "2", img: "/default/im2.PNG", url: "#", width: 30, height: 200 },
  { id: "3", img: "/default/im3.jpg", url: "#", width: 30, height: 200 },
  { id: "4", img: "/default/im4.JPG", url: "#", width: 30, height: 200 },

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
      <Masonry items={items} columns={2} gap={16}/>

    </aside>
  </div>      
</section>


  );
}

export default Experience 