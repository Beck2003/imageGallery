// Main.js
import React, { useContext, useEffect, useMemo } from 'react';
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

  const newThemes = useMemo(
    () => [...contextThemes, contextThemes],
    [contextThemes]
  );

  // useEffect(() => {
  //   // Only update context themes if it's different
  //   if (contextThemes.length !== newThemes.length || !contextThemes.every((theme, index) => theme === newThemes[index])) {
  //     setContextThemes(newThemes);
  //   }
  // }, [contextThemes, newThemes, setContextThemes]);

  setContextThemes(newThemes);

  // console.log('newThemes',newThemes);

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
