'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  useJsApiLoader,
  LoadScriptProps,
} from '@react-google-maps/api';

import Distance from './Distance';
import Categories from '../Categories/Categories';
import SearchBox from './SearchBox';

//Shorthands for
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const libraries: LoadScriptProps['libraries'] = ['places'];

interface MapProps {
  small?: boolean;
}

const Map: React.FC<MapProps> = ({ small }) => {
  const googleMapsApiKey: string =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '';

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries,
  });

  const [location, setLocation] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();

  const mapRef = useRef<GoogleMap>();

  const center = useMemo<LatLngLiteral>(() => {
    return { lat: 45.81, lng: 15.99 };
  }, []);

  const options = useMemo<MapOptions>(() => {
    return {
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: 'a747c302a0ba26ea',
    };
  }, []);

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const houses = useMemo(() => generateHouses(center), [center]);

  //ovom funkcijom računamo put od kuće od ureda
  const fetchDirections = (house: LatLngLiteral) => {
    if (!location) return;

    const directionService = new google.maps.DirectionsService();
    directionService.route(
      {
        origin: house,
        destination: location,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
        }
      }
    );
  };

  if (!isLoaded)
    return (
      <div className='h-1vh flex items-center justify-center'>Loading...</div>
    );

  return (
    <div
      className={`${
        small ? 'flex flex-col ' : 'relative top-[86px] flex w-full'
      }`}
    >
      {/* TODO: napraviti posebnu komponentu od sidebara, pitanje dali se može */}
      <div className={`${small ? 'pb-8' : 'w-[30%] bg-bei p-4 text-blu'}`}>
        {small ? (
          <>
            <div className='flex flex-col justify-center'>
              <SearchBox
                small
                setLocation={(position) => {
                  setLocation(position);
                  mapRef.current?.panTo(position);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-col justify-center'>
              <p className='mb-3 text-center'>Upišite željenu lokaciju.</p>
              <SearchBox
                setLocation={(position) => {
                  setLocation(position);
                  mapRef.current?.panTo(position);
                }}
              />
            </div>
            <Categories />
          </>
        )}

        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
      <div className='w-[100%]'>
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName={`${small ? 'h-80' : 'h-[calc(100vh-86px)]'}`}
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#0F4D86',
                  strokeWeight: 5,
                  strokeOpacity: 0.7,
                },
              }}
            />
          )}

          {location && (
            <>
              <Marker
                position={location}
                // icon='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
              />

              {/* <MarkerClusterer>
                {(clusterer) => (
                  <div>
                    {houses.map((house) => (
                      <Marker
                        key={house.lat}
                        position={house}
                        clusterer={clusterer}
                        onClick={() => {
                          fetchDirections(house);
                        }}
                      />
                    ))}
                  </div>
                )}
              </MarkerClusterer>

              <Circle center={location} radius={3000} options={closeOptions} />
              <Circle center={location} radius={6000} options={middleOptions} />
              <Circle center={location} radius={12000} options={farOptions} /> */}
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: '#FBC02D',
  fillColor: '#FBC02D',
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: '#FF5252',
  fillColor: '#FF5252',
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
