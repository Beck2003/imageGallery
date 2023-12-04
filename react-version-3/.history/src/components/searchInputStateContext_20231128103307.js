import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { createClient } from 'pexels';
// Action types
const SET_SEARCH_INPUT = 'SET_SEARCH_INPUT';
const SET_COLLECTION = 'SET_COLLECTION';
const SET_THEME = 'SET_THEME';
// Reducer function
const searchQueryReducer = (state, action) => {
    console.log('action', action.payload);
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return { ...state, searchInput: action.payload };
    case SET_COLLECTION:
      return { ...state, collection: action.payload };
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
  theme: 'home'
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
  const setTheme = (value) => {
    dispatch({ type: SET_THEME, payload: value });
  }
  // Fetch data and set collection on mount or when searchInput changes
  useEffect(() => {
    const fetchDataAndSetCollection = async () => {
      try {
        let data;
        if (!state.searchInput?.length) {
          const client = createClient('RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V');
          data = await client.photos.curated({ per_page: 200 });
        } else {
          const client = createClient('RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V');
          data = await client.photos.search({ query: state.searchInput, per_page: 40 });
        }
        const photos = data?.photos || [];
        setCollection(photos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataAndSetCollection();
  }, [state.searchInput]);
  return (
    <SearchQueryContext.Provider value={{ ...state, setSearchInput, setCollection, setTheme }}>
      {children}
    </SearchQueryContext.Provider>
  );
};







