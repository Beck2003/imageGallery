import React, { useState, useContext, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { fetchData } from '@/pages/api/PexlesApi';

const SearchBar = ({
  contextTheme,
  searchInput,
  contextThemes,
  setContextThemes,
  setContextTheme
}) => {
  const [localSearchState, setLocalSearchState] = useState([]);
  // console.log('localSearchState', localSearchState);
  console.log('setContextTheme', setContextTheme);
  const generalThemes = [
    'Nature',
    'Technology',
    'Abstract',
    'Travel',
    'Food',
    'Animals',
    'Cityscape',
    'Fitness',
    'Fashion',
    'Music',
    'Art',
    'Space',
    'Sports',
    'Vintage',
    'Film',
    'Books',
    'Architecture',
    'Cars',
    'Health',
    'Business',
    'Education',
    'History',
    'Science',
    'Holiday',
    'People',
    'Party',
    'Family',
    'Love',
    'Friendship',
    'Adventure',
    'Fantasy',
    'Gaming',
    'Hobbies',
    'Spirituality',
    'Weather',
    'Water',
    'Cats',
    'Dogs',
    'Birds',
    'Sunset',
    'Sunrise',
    'Mountains',
    'Beaches',
    'Winter',
    'Summer',
    'Autumn',
    'Spring'
  ];
  const handleSearchInputChange = (event, newValue) => {
    setLocalSearchState(newValue);
  };

  const handleSendSearch = async () => {
    setContextThemes(localSearchState);
    await fetchData(undefined, localSearchState);
  };

  useEffect(() => {
    setLocalSearchState(searchInput);
  }, [searchInput]);

  useEffect(() => {
    setContextThemes(setContextThemes);
  }, [contextThemes]);

  return (
    <div className='flex justify-center items-center w-full h-full fixed top-0 left-0 z-0 invisible'>
      <div className=' flex justify-center items-center w-100 bg-gradient-to-r from-blue-500 to-transparent z-0 visible'>
        <Stack spacing={3} sx={{ width: 500 }}>
          <Button variant='contained' onClick={handleSendSearch}>
            {' '}
            Send
          </Button>
          <Autocomplete
            multiple
            id='tags-filled'
            options={generalThemes}
            value={localSearchState || []}
            freeSolo
            onChange={handleSearchInputChange}
            renderTags={(value, getTagProps) =>
              Array.isArray(value)
                ? value.map((option, index) => (
                    <Chip
                      variant='outlined'
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                : null
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                label='Image Search'
                placeholder='...'
              />
            )}
          />
        </Stack>
      </div>
    </div>
  );
};
export default SearchBar;
