// Main.js
import React, { useState, useContext, useEffect, lazy } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchQueryContext } from '@/context/mainContext';
import  Title from '@/components/Title';

const Main = React.memo(() => {
  const {
    collection,
    theme,
    setTheme,
    themes,
    setSearchInput,
    fetchDataAndSetCollection,
  } = useContext(SearchQueryContext);
  const [heroPhoto, setHeroPhoto] = useState({});
  useEffect(() => {
    // Fetch data only on the initial mount
    if (collection.length === 0) {
      // Set a random theme
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      setTheme(randomTheme);

      // Fetch data with an empty search input to get a random set
      setSearchInput('');
      fetchDataAndSetCollection();
    }
  }, []); // Empty dependency array to fetch data only on mount

// set hero photo
useEffect(() => {
  if (collection.length > 0) {
    const randomIndex = Math.floor(Math.random() * collection.length);
    const selectedPhoto = collection[randomIndex];
    setHeroPhoto(selectedPhoto);
  }
}, [collection]);
  return (
    <>
    <div className='w-full max-w-none'>
    {heroPhoto.src && (
          <Link
            href={{
              pathname: `/photos/${heroPhoto.id}`,
              query: { collection: JSON.stringify(collection) },
            }}
            passHref
          >
        <div
          className=" w-100 min-h-screen flex justify-center items-center"
          id="curatedHero"
          style={{
            backgroundImage: `url(${heroPhoto.src.xxlarge || heroPhoto.src.original}?auto=format&fit=crop)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            loading: 'lazy'
            
          }}
        >
          <Title />
        </div>
        </Link>
        
      )}
      </div>
    <div className='mx-12 columns-1 sm:columns-2 md:columns-3 lg:columns-4 mt-5'>
      {collection.map((photo) => (
        <div key={photo.id} className='mb-4'>
          <Link
            href={{
              pathname: `/photos/${photo.id}`,
              query: { collection: JSON.stringify(collection) },
            }}
            passHref
          >
            <Image
              src={`${photo.src.large || photo.src.original}?auto=format&fit=crop`}
              alt={photo.photographer}
              width={photo.width}
              height={photo.height}
              className='max-w-full h-auto'
              priority
            />
          </Link>
        </div>
      )
      )}
    </div>
    <div className='w-100 flex justify-end'>
    <div className=' italic px-2 bg-gray-200 opacity-60'>
      Photos Provided by Pexels
    </div>
    </div>
    
    </>
  );
}, (prevProps, nextProps) => {
  // Memoize the component to prevent unnecessary rerenders
  return true;
}

);

export default Main;
