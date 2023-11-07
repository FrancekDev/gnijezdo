import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import * as Ariakit from '@ariakit/react';

import { Autocomplete } from '@react-google-maps/api';
import { ChangeEvent } from 'react';

interface LocationFormProps {
  // TODO: promjeniti tip i possibly undefined error zbog ?
  onSelectAddress: (
    address: string,
    location: [number, number] | [null, null]
  ) => void;
  defaultValue?: string;
}

const LocationForm = ({ onSelectAddress, defaultValue }: LocationFormProps) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (e.target.value === '') {
      onSelectAddress('', [null, null]);
    }
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      onSelectAddress(address, [lat, lng]);
    } catch (error) {
      // TODO: staviti toast notifikaciju
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='flex justify-center'>
      <Ariakit.ComboboxProvider>
        <Ariakit.Combobox
          value={value}
          onChange={handleChange}
          disabled={!ready}
          className={`${'h-10 w-80 rounded-md border-none bg-white pl-4 pr-4 text-base leading-6 text-gray-900 shadow outline-2 outline-blu'}`}
          placeholder={`Gornji Grad, Zagreb`}
        />

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
};

export default LocationForm;
