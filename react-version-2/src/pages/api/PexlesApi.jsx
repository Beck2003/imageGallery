'use client';
import React, { useContext, useEffect, useState } from 'react';
import { createClient } from 'pexels';
import Link from 'next/link';
import Image from 'next/image';
import { SearchQueryContext} from '@/components/searchInputStateContext';
import Title from '@/components/heroTitle.js'




// ... (imports and context)

const PexelsApi = ({ theme }) => {
  const [collection, setCollection] = useState([]);
  const { searchInput } = useContext(SearchQueryContext);
  const [heroPhoto, setHeroPhoto] =useState({})
  const fetchData = async () => {
    console.log(theme)
    try {
      let data;
      if (!theme?.length && !searchInput?.length) {
        const client = createClient('RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V');
        data = await client.photos.curated({ per_page: 200 }); 
      } else {
        const client = createClient('RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V');
        data = await client.photos.search({ query: searchInput?.length ? searchInput : theme, per_page: 40 });
      }

      const photos = data?.photos || [];

      if (!theme?.length) {
        const selectedImages = getRandomImages(photos, 40);
        setCollection(selectedImages);
      } else {
        setCollection(photos);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };
  useEffect(() => {
    if (collection.length > 0) {
      const randomIndex = Math.floor(Math.random() * collection.length);
      const selectedPhoto = collection[randomIndex];
      setHeroPhoto(selectedPhoto);
    }
  }, [collection]);

  useEffect(() => {
    fetchData();
  }, [searchInput, theme]);  

  const getRandomImages = (arr, n) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };
console.log(heroPhoto)
  // Render the component
  return (
    <>
    {heroPhoto.src && (
  <div
    className="w-full min-h-screen flex items-center justify-center nb"
    id="curatedHero"
    style={{
      backgroundImage: `url(${heroPhoto.src.xxlarge || heroPhoto.src.original}?auto=format&fit=crop)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    <Title />
  </div>
)}
    <div className='mx-12 columns-4 z-50'>
      {collection.map((photo) => (
        <div key={photo.id} className='mb-4'>
          <Link href="/photos/[id]" as={`/photos/${photo.id}`} passHref>
            <Image
              src={`${photo.src.large || photo.src.original}?auto=format&fit=crop`}
              alt={photo.photographer}
              width={photo.width}
              height={photo.height}
              className="max-w-full h-auto"
            />
          </Link>
        </div>
      ))}
    </div>
    </>
  );
};

export default PexelsApi;
