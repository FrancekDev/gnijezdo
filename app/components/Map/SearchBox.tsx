import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import * as Ariakit from '@ariakit/react';
import { Autocomplete } from '@react-google-maps/api';

type SearchBoxProps = {
  setLocation: (position: google.maps.LatLngLiteral) => void;
};

export default function SearchBox({ setLocation }: SearchBoxProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['geocode'],
      componentRestrictions: {
        country: 'HR',
      },
      language: 'HR',
    },

    debounce: 300,
  });

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setLocation({ lat, lng });
    sessionStorage.removeItem('upa');
  };

  return (
    <div className='flex justify-center'>
      <Ariakit.ComboboxProvider>
        {/* <label className='label'>
          Upišite željenu lokaciju. */}
        <Ariakit.Combobox
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className='combobox'
          placeholder='Gornji Grad, Zagreb'
        />
        {/* </label> */}
        {status === 'OK' && (
          <Ariakit.ComboboxPopover gutter={8} sameWidth className='popover'>
            {status === 'OK' &&
              data.map(({ place_id, description }) => (
                <Ariakit.ComboboxItem
                  key={place_id}
                  value={description}
                  className='combobox-item'
                  onClick={() => handleSelect(description)}
                  clickOnEnter
                />
              ))}
          </Ariakit.ComboboxPopover>
        )}
      </Ariakit.ComboboxProvider>
    </div>
  );
}
