// Layout.js
import React from 'react';
import Navbar from '@/components/navbar.jsx';
import { SearchQueryContextProvider } from '@/context/mainContext'; // Update the import path
import SearchBar from './SearchBar';

const Layout = ({ children }) => {
  return (
    <SearchQueryContextProvider>
      <SearchBar />
      <Navbar />
      <main>{children}</main>
    </SearchQueryContextProvider>
  );
};

export default Layout;
