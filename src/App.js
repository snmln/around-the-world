import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic25tbG4iLCJhIjoiY202ZmdhcDZ0MDR3ZTJpcTB4dmtoZTF3aCJ9.D8agtdsV1t5f2AgjQgLM4w';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 13,
      center: [-122.447303, 37.753574]
    });

    mapRef.current.on('load', () => {
      mapRef.current.addSource('mapbox-terrain', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2'
      });
      mapRef.current.addLayer(
        {
          id: 'terrain-data',
          type: 'line',
          source: 'mapbox-terrain',
          'source-layer': 'contour',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#ff69b4',
            'line-width': 1
          }
        },
        'road-label-simple'
      );
    });

    return () => mapRef.current.remove();
  }, []);

  return <div id="map" ref={mapContainerRef} ></div>;
};

export default MapboxExample;
