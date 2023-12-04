// Layout.js
import React from 'react';
import SearchBar from '@/components/SearchBar';
import Navbar from '@/components/navbar.jsx';
import { SearchQueryContextProvider } from '@/context/searchContext'; // Update the import path

const Layout = ({ children }) => {
  return (
    <SearchQueryContextProvider>
      <Navbar />
      <main>{children}</main>
    </SearchQueryContextProvider>
  );
};

export default Layout;
