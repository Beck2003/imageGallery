// Create a new file, e.g., searchContext.js

import React, { createContext, useReducer, useEffect } from 'react';
import { createClient } from 'pexels';

// Action types
const SET_SEARCH_INPUT = 'SET_SEARCH_INPUT';
const SET_COLLECTION = 'SET_COLLECTION';
const SET_THEMES = 'SET_THEMES';
const SET_THEME = 'SET_THEME';

// Reducer function
const searchQueryReducer = (state, action) => {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return { ...state, searchInput: action.payload };
    case SET_COLLECTION:
      return { ...state, collection: action.payload };
    case SET_THEMES:
      return { ...state, themes: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  searchInput: '',
  collection: [],
  theme: 'home',
  themes: []
};

// Create context
export const SearchQueryContext = createContext();

// Context provider component
export const SearchQueryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchQueryReducer, initialState);

  const setSearchInput = (value) => {
    dispatch({ type: SET_SEARCH_INPUT, payload: value });
  };

  const setCollection = (value) => {
    dispatch({ type: SET_COLLECTION, payload: value });
  };

  const setThemes = (value) => {
    dispatch({ type: SET_THEMES, payload: value });
  };

  const setTheme = (value) => {
    dispatch({ type: SET_THEME, payload: value });
  };

  const fetchDataAndSetCollection = async (searchInput, themes) => {
    try {
      let data;
      if (!state.searchInput?.length) {
        const client = createClient(
          'RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V'
        );
        data = await client.photos.curated({ per_page: 200 });
      } else {
        const client = createClient(
          'RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V'
        );
        data = await client.photos.search({
          query: state.searchInput?.length ? searchInput : themes,
          per_page: 40
        });
      }
      const photos = data?.photos || [];
      setCollection(photos);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    // Check if the component is mounted before calling fetchDataAndSetCollection
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) {
        await fetchDataAndSetCollection();
      }
    };

    fetchData();

    return () => {
      // Set isMounted to false on component unmount
      isMounted = false;
    };
  }, [state.searchInput]);

  return (
    <SearchQueryContext.Provider
      value={{
        ...state,
        setSearchInput,
        setCollection,
        setThemes,
        setTheme,
        fetchDataAndSetCollection
      }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
};
