'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useLoadScript } from '@react-google-maps/api';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from '@react-google-maps/api';
import Places from './Places';
import Distance from './Distance';

//Shorthands for
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const dafaultOptinos = {
  strokeOpecity: 0.5,
  stokeWeight: 2,
  clickable: false,
  gragable: false,
  editable: false,
  visible: true,
};

// const closeOptins = {
//   ...defaultOptions,
// };

const Map = () => {
  const googleMapsApiKey: string =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '';

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ['places'],
  });

  // Places;
  // const mapId: string[] = ['b92d122ee1eed5ef'];
  // const mapContainerStyle = {
  //   width: '1000px',
  //   height: '87vh',
  // };
  // const centerCordinates = { lat: 45.81, lng: 15.96 };

  if (!isLoaded) return <div>Loading...</div>;

  return <div>Map</div>;
};

export default Map;
