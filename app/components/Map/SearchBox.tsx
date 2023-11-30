import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import * as Ariakit from '@ariakit/react';

import { Autocomplete } from '@react-google-maps/api';

interface SerachBoxProps {
  setLocation: (position: google.maps.LatLngLiteral) => void;
  small?: boolean;
}

const SearchBox: React.FC<SerachBoxProps> = ({ small, setLocation }) => {
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
        <Ariakit.Combobox
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className={`${
            small
              ? 'h-10 w-80 rounded-md border-none bg-white pl-4 pr-4 text-base leading-6 text-gray-900 shadow outline-2 outline-blu'
              : 'h-10 w-48 rounded-md border-none bg-white pl-4 pr-4 text-base leading-6 text-gray-900 shadow outline-2 outline-blu'
          }`}
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

export default SearchBox;
