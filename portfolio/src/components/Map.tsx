'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Map } from 'react-map-gl/maplibre';
import { ScatterplotLayer, GeoJsonLayer } from 'deck.gl';
import { MapboxOverlay } from '@deck.gl/mapbox';
import Crosshair from './molecules/Crosshair';
const MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const INITIAL_VIEW_STATE = {
  longitude: -97,
  latitude: 39,
  zoom: 2.9,
  pitch: 0,
  bearing: 0
} as const;

type City = { name: string; lon: number; lat: number; state: string };

const CITIES: City[] = [
  { name: 'Ithaca',        lon: -76.5019, lat: 42.4440, state: 'New York' },
  { name: 'Boston',        lon: -71.0589, lat: 42.3601, state: 'Massachusetts' },
  { name: 'Dallas',        lon: -96.7970, lat: 32.7767, state: 'Texas' },
  { name: 'Chicago',       lon: -87.6298, lat: 41.8781, state: 'Illinois' },
  { name: 'San Francisco', lon: -122.4194, lat: 37.7749, state: 'California' },
  { name: 'San Diego',     lon: -117.1611, lat: 32.7157, state: 'California' }
];


const TARGET_STATES = [
  'California',
  'New York',
  'Massachusetts',
  'Texas',
  'Illinois'
] as const;

const TARGET_CITIES = [
  'San Diego',
  'San Francisco',
  'Ithaca',
  'Dallas',
  'Chicago',
  'Boston'
] as const 

const CITY_BBOX: Record<typeof TARGET_CITIES[number], [number, number, number, number]> = {
  Ithaca:        [-76.92, 42.06, -76.08, 42.82],
  Boston:        [-71.65, 41.92, -70.47, 42.80],
  Dallas:        [-97.40, 32.40, -96.19, 33.15],
  Chicago:       [-88.36, 41.47, -86.90, 42.29],
  'San Francisco':[-122.93, 37.22, -121.91, 38.32],
  'San Diego':   [-117.67, 32.38, -116.65, 33.05],
};

const STATE_BBOX: Record<typeof TARGET_STATES[number], [number, number, number, number]> = {
  California:     [-124.48, 32.53, -114.13, 42.01],
  'New York':     [-79.76,  40.50, -71.85, 45.01],
  Massachusetts:  [-73.50,  41.23, -69.93, 42.88],
  Texas:          [-106.65, 25.84, -93.51,  36.50],
  Illinois:       [-91.51,  36.98, -87.02,  42.51]
};

const DESC : Record<typeof TARGET_CITIES[number], string> = {
  'San Diego': "Met some Great People here at the ESRI User Conference! ",
  'San Francisco': "A nerve-wrecking but fulfilling First Internship at Google Vertex AI.",
  Ithaca: "School here was something completely mesmerizing.",
  Boston:  "Unforgettable Internship at MIT Lincoln Lab, working with great minds",
  Dallas:  "My very first conference, and my first suit in a long time!",
  Chicago:  "NSBE Nationals Conference where I took a chace at my networking skills."     
}
interface UsMapDeckProps {
  onCitySelect: (city: string | null) => void;
}


export default function UsMapDeck({ onCitySelect }: UsMapDeckProps) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [usStates, setUsStates] = useState<any>(null);
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch('https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson')
      .then((r) => r.json())
      .then(setUsStates);
  }, []);

const stateLayer = useMemo(() => {
  if (!usStates || !usStates.features) return null;  

  const focusStates = {
    ...usStates,                                     
    features: usStates.features.filter((f: any) =>{

      return TARGET_STATES.includes(f.properties["STATE_NAME"])}
    ),
  };


  return new GeoJsonLayer({
    id: 'state-outline',
    data: focusStates,
    pickable: false,
    stroked: true,
    filled: true,
    getFillColor: [255, 255, 255, 50],
    lineWidthMinPixels: 1,
  });
}, [usStates]);

  const scatterLayer = useMemo(
    () =>
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        pickable: true,
        radiusUnits: 'pixels',
        getPosition: (d) => [d.lon, d.lat],
        getRadius: 4,
        getFillColor: [200, 255, 255, 180],
        stroked: true,
       
        lineWidthUnits: 'pixels',
        getLineWidth: (d) =>
          hoveredCity && hoveredCity.name === d.name ? 8 : 0,
        updateTriggers: { getLineWidth: [hoveredCity] },
        // onHover: ({ object }) => setHoveredCity((object as City) || null),
        onClick: ({ object }) => {
          const city = object as City;
          const box = CITY_BBOX[city.name as keyof typeof CITY_BBOX];
          if (!box || !mapRef.current) return;

          mapRef.current.fitBounds(
            [
              [box[0], box[1]],
              [box[2], box[3]]
            ],
            { padding: 100, duration: 1500, easing: (t) => t * (2 - t)  }
          );
          setSelectedState(city.state);
          setHoveredCity(city)
          onCitySelect(city.name);
        }
      }),
    [ onCitySelect]
  );


  const handleLoad = (e: { target: maplibregl.Map }) => {
    mapRef.current = e.target;
    const layers = stateLayer ? [stateLayer, scatterLayer] : [scatterLayer];
    const overlay = new MapboxOverlay({ layers });
    e.target.addControl(overlay);
  };


  const handleReset = () => {
    if (mapRef.current) {
      mapRef.current.easeTo({ ...INITIAL_VIEW_STATE, duration: 800 });
    }
    setSelectedState(null);
  };
  if(!usStates || !usStates.features){return<p>LOADING</p> }

  return (
    <div ref={containerRef}  className="relative h-full w-full"  
    onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

      <Map
        mapStyle={MAP_STYLE}
        initialViewState={INITIAL_VIEW_STATE}
        onLoad={handleLoad}
        interactive= {true}
        style={{ width: '100%', height: '100%' }}
      />


      {selectedState && (
        <>
        <button
          onClick={handleReset}
          className="absolute top-4 left-4 z-10
                     bg-white/80 hover:bg-white text-black
                     px-3 py-1 rounded shadow"
        >
          Back
        </button>
        <div
          className="absolute top-[80%] left-1/2 z-10
                  bg-black/20 text-white font-bold
                  px-3 py-1 rounded-2xl shadow
                  max-w-xs text-center"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <p>{DESC[hoveredCity?.name as keyof typeof DESC]}</p>
        </div>
        </>
      )}
       {isHovered && (
        <Crosshair
          containerRef={containerRef}
          color="rgba(132, 204, 22, 0.5)" 
          thickness={.5}
        />
      )}
    </div>
  );
}
