// SearchBar.js
import React, { useState, useContext, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { SearchQueryContext } from "@/context/mainContext"; // Update the import path
import { ScrollDetector } from "./ScrollDetector";
const SearchBar = () => {
  const { setSearchInput, setThemes, fetchDataAndSetCollection } =
    useContext(SearchQueryContext);
  const isScrolled = ScrollDetector();
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

  const [localSearchState, setLocalSearchState] = useState([]);

  const handleSearchInputChange = (event, newValue) => {
    setLocalSearchState(newValue);
  };

  const handleSendSearch = () => {
    // Set the search input to an empty string
    setSearchInput("");

    // Set the selected themes
    setThemes(localSearchState);

    // Fetch data with the selected themes
    fetchDataAndSetCollection(localSearchState);
  };

  return isScrolled ? (
    <div className='fixed top-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-9/12 sm:w-[500px] border-2 border-gray-500 backdrop-blur-md visible'>
      <Stack spacing={3} sx={{ width: 500 }}>
        <Button
          variant='contained'
          className='hover:bg-black hover:opacity-100 text-white  font-bold bg-gray-500 opacity-50'
          onClick={handleSendSearch}
        >
          {" "}
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
              sx={{ color: "white" }}
            />
          )}
        />
      </Stack>
    </div>
  ) : (
    <div className='  absolute left-1/2 transform -translate-x-1/2 bottom-1/4 border-2 border-gray-500 backdrop-blur-md'>
      <div className='flex justify-center items-center  z-3 '></div>
      <Stack spacing={3} sx={{ width: 500 }}>
        <Button
          variant='contained'
          className='hover:bg-black hover:opacity-100 text-white  font-bold bg-gray-500 opacity-50'
          onClick={handleSendSearch}
        >
          {" "}
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
              sx={{ color: "white" }}
            />
          )}
        />
      </Stack>
    </div>
  );
};
export default SearchBar;
