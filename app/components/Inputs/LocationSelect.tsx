'use client';

import useCountries from '@/hooks/useCountries';
import Select from 'react-select';

export type LocationSelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface LocationSelectProps {
  value?: LocationSelectValue;
  onChange: (value: LocationSelectValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder='Anywhere'
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as LocationSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className='flex flex-row items-center gap-3'>
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className='ml-1 text-neutral-500'>{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'blak',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

export default LocationSelect;
