import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar'; // Import the SearchBar component
import { fetchData } from '@/pages/Home';

const Home = ({
  theme: contextTheme,
  themes: contextThemes,
  setTheme: setContextTheme,
  setThemes: setContextThemes,
  searchInput
}) => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const fetchDataAndSetCollection = async () => {
      try {
        const photos = await fetchData(searchInput, contextTheme);
        if (!contextTheme?.length) {
          const selectedImages = getRandomImages(photos, 40);
          setCollection(selectedImages);
        } else {
          setCollection(photos);
        }
        setContextTheme(contextTheme);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAndSetCollection();
  }, [searchInput, contextTheme, contextThemes, setContextThemes]);

  return (
    <>
      <SearchBar
        contextTheme={contextTheme}
        searchInput={searchInput}
        contextThemes={contextThemes}
        setContextThemes={setContextThemes}
        setContextTheme={setContextTheme}
      />
      <div className='columns-6'>
        {collection.map((photo) => (
          <div key={photo.id} className='mb-4'>
            <Link href={`/photos/${photo.id}?theme=${contextTheme}`} passHref>
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
        ))}
      </div>
    </>
  );
};

export default Home;

// Assuming getRandomImages is still defined somewhere in your code
const getRandomImages = (arr, n) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};
