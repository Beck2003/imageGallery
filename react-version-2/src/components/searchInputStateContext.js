'use client'

import React, { createContext, useState } from 'react';

export const SearchQueryContext = createContext();

export const SearchQueryContextProvider = ( { children }) => {
    const [ searchInput, setSearchInput ] = useState([]);
    //globel searchinput value
return (
    <SearchQueryContext.Provider value={{ searchInput, setSearchInput }}>
        { children } 
    </SearchQueryContext.Provider>
);
};
