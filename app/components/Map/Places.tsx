import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import * as Ariakit from '@ariakit/react';

type PlacesProps = {
  setLocation: (position: google.maps.LatLngLiteral) => void;
};

export default function Places({ setLocation }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setLocation({ lat, lng });
  };

  return (
    <>
      <Ariakit.ComboboxProvider>
        <label className='label'>
          Pretraži lokaciju.
          <Ariakit.Combobox
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className='combobox'
            placeholder='Search office address'
          />
        </label>
        {status === 'OK' && (
          <Ariakit.ComboboxPopover gutter={8} sameWidth className='popover'>
            {status === 'OK' &&
              data.map(({ place_id, description }) => (
                <Ariakit.ComboboxItem
                  key={place_id}
                  value={description}
                  className='combobox-item'
                  onClick={() => handleSelect(description)}
                />
              ))}
          </Ariakit.ComboboxPopover>
        )}
      </Ariakit.ComboboxProvider>
    </>
  );
}
