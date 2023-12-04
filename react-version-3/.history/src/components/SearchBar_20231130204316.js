// SearchBar.js
import React, { useState, useContext, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SearchQueryContext } from '@/context/mainContext'; // Update the import path

const SearchBar = () => {

  

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
