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
    setContextThemes([...contextThemes, contextThemes]);
    console.log('contextThemes', contextThemes);
  }, [contextThemes]); // Add dependencies if needed

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
