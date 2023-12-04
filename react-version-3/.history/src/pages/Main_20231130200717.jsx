// Main.js
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchQueryContext } from '@/context/mainContext'; // Update the import path
import SearchBar from '@/components/SearchBar';

const Main = () => {
  const {
    searchInput,
    theme: contextTheme,
    setTheme: setContextTheme,
    setThemes: setContextThemes,
    themes: contextThemes,
    collection
  } = useContext(SearchQueryContext);

  useEffect(() => {
    // This effect will run after the component has been rendered
    const newThemes = [...contextThemes, 'newTheme'];
  
    // Check if the new state is different from the previous state
    if (!arraysAreEqual(contextThemes, newThemes)) {
      setContextThemes(newThemes);
    }
  }, [contextThemes]);
  
  // Helper function to check if two arrays are equal
  function arraysAreEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }
  return (
    <div className='columns-6'>
      <SearchBar />
      {collection.map((photo) => (
        <div key={photo.id} className='mb-4'>
          <Link href={`/photos/${photo.id}?theme=${contextTheme}`} passHref>
            <Image
              src={`${
                photo.src.large || photo.src.original
              }?auto=format&fit=crop`}
              alt={photo.photographer}
              width={photo.width}
              height={photo.height}
              className='max-w-full h-auto'
              priority
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Main;
