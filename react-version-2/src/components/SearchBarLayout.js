"use client";
import React, { useState, useContext, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { SearchQueryContext } from "./GlobalStates";
import { ScrollDetector } from "./ScrollDetector";
// import handleSendSearch from './searchImagesReRender';
// import SendIcon from '@mui/icons-material/Send';

const SearchBar = () => {
  const { searchInput, setSearchInput } = useContext(SearchQueryContext);
  const [localSearchState, setLocalSearchState] = useState([]);
  const isScrolled  = ScrollDetector();
  const generalThemes = [
    "Nature",
    "Technology",
    "Abstract",
    "Travel",
    "Food",
    "Animals",
    "Cityscape",
    "Fitness",
    "Fashion",
    "Music",
    "Art",
    "Space",
    "Sports",
    "Vintage",
    "Film",
    "Books",
    "Architecture",
    "Cars",
    "Health",
    "Business",
    "Education",
    "History",
    "Science",
    "Holiday",
    "People",
    "Party",
    "Family",
    "Love",
    "Friendship",
    "Adventure",
    "Fantasy",
    "Gaming",
    "Hobbies",
    "Spirituality",
    "Weather",
    "Water",
    "Cats",
    "Dogs",
    "Birds",
    "Sunset",
    "Sunrise",
    "Mountains",
    "Beaches",
    "Winter",
    "Summer",
    "Autumn",
    "Spring",
  ];
  const handleSearchInputChange = (event, newValue) => {
    setLocalSearchState(newValue);
  };
  const handleSendSearch = () => {
    setSearchInput([...localSearchState]);
  };
  useEffect(() => {
    setLocalSearchState(searchInput);
  }, [searchInput]);
  return (
    isScrolled ? (
      <div className='fixed top-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-5/6 sm:w-[500px] bg-gradient-to-r from-blue-500 to-transparent z-0 visible'>
          <Stack spacing={3} sx={{ width: 500 }}>
            <Button variant='contained' onClick={handleSendSearch}>
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
    ) : (
            <div className='flex justify-center items-end w-full h-full absolute bottom-40 z-0 invisible'>
        <div className='flex justify-center items-center w-5/6 sm:w-[500px] bg-gradient-to-r from-blue-500 to-transparent z-0 visible'>
          <Stack spacing={3} sx={{ width: 500 }}>
            <Button variant='contained' onClick={handleSendSearch}>
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
    )
  );
};

export default SearchBar;
