'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Map } from 'react-map-gl/maplibre';
import { ScatterplotLayer, GeoJsonLayer } from 'deck.gl';
import { MapboxOverlay } from '@deck.gl/mapbox';
import Crosshair from './Crosshair';
const MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const INITIAL_VIEW_STATE = {
  longitude: -97,
  latitude: 39,
  zoom: 2.9,
  pitch: 0,
  bearing: 0
} as const;

/* ── city & state data ─────────────────────────────────────────────────── */
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

/* lonMin, latMin, lonMax, latMax */
const STATE_BBOX: Record<typeof TARGET_STATES[number], [number, number, number, number]> = {
  California:     [-124.48, 32.53, -114.13, 42.01],
  'New York':     [-79.76,  40.50, -71.85, 45.01],
  Massachusetts:  [-73.50,  41.23, -69.93, 42.88],
  Texas:          [-106.65, 25.84, -93.51,  36.50],
  Illinois:       [-91.51,  36.98, -87.02,  42.51]
};
interface UsMapDeckProps {
  onStateSelect: (state: string | null) => void;
}


export default function UsMapDeck({ onStateSelect }: UsMapDeckProps) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [usStates, setUsStates] = useState<any>(null);
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  /* fetch GeoJSON once */
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
    // getLineColor: [163, 230, 53, 200],
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
        onHover: ({ object }) => setHoveredCity((object as City) || null),
        onClick: ({ object }) => {
          const city = object as City;
          const box = STATE_BBOX[city.state as keyof typeof STATE_BBOX];
          if (!box || !mapRef.current) return;

          mapRef.current.fitBounds(
            [
              [box[0], box[1]],
              [box[2], box[3]]
            ],
            { padding: 40, duration: 800 }
          );
          setSelectedState(city.state);
          onStateSelect(city.state);
        }
      }),
    [hoveredCity, onStateSelect]
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
        interactive= {false}
        style={{ width: '100%', height: '100%' }}
      />


      {selectedState && (
        <button
          onClick={handleReset}
          className="absolute top-4 left-4 z-10
                     bg-white/80 hover:bg-white text-black
                     px-3 py-1 rounded shadow"
        >
          Back
        </button>
        
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
