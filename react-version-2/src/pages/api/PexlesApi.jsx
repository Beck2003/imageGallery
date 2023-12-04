 'use client';


 import { useContext, useEffect, useState } from 'react';
 import { createClient } from 'pexels';
 import Link from 'next/link';
 import Image from 'next/image';
 import { SearchQueryContext } from '@/components/GlobalStates.js';
  import Title from '@/components/heroTitle';
import Navbar from '@/components/navbar';
import SearchBar from '@/components/SearchBarLayout';
  export const fetchData = async (searchInput, theme) => {
    try {
      let data;
      if (!theme?.length && !searchInput?.length) {
        const client = createClient('RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V');
        data = await client.photos.curated({ per_page: 200 });
      } else {
        const client = createClient('RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V');
        data = await client.photos.search({ query: searchInput?.length ? searchInput : theme, per_page: 40 });
        console.log('api data:',  data )
      }
      const photos = data?.photos || [];
      return photos;
    } catch (error) {
      console.error('Error fetching photo data:', error);
      throw error;
    }
  };
  const getRandomImages = (arr, n) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };
  const PexelsApi = ({ theme }) => {
  const { searchInput, collection, setCollection} = useContext(SearchQueryContext);
  const [heroPhoto, setHeroPhoto] = useState({});
  useEffect(() => {
    const fetchDataAndSetCollection = async () => {
      try {
        const photos = await fetchData(searchInput, theme);
        if (!theme?.length) {
          const selectedImages = getRandomImages(photos, 40);
          setCollection(selectedImages);
        } else {
          setCollection(photos);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataAndSetCollection();
  }, [searchInput, theme]);

  useEffect(() => {
    if (collection.length > 0) {
      const randomIndex = Math.floor(Math.random() * collection.length);
      const selectedPhoto = collection[randomIndex];
      setHeroPhoto(selectedPhoto);
    }
  }, [collection]);
console.log('collection: ',collection)
console.log('heroPhoto: ',heroPhoto)
  return (
    <>
    <SearchBar />
    <Navbar />
      {heroPhoto.src && (
        <Link href={`/photos/${heroPhoto.id}?theme=${theme}`} passHref>
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
        </Link>
      )}

      <div className='mx-12 columns-1 sm:columns-2 md:columns-3 lg:columns-4 z-50 mt-5'>
        {collection.map((photo) => (
          <div key={photo.id} className='mb-4'>
            <Link href={`/photos/${photo.id}?theme=${theme}`} passHref>
              <Image
                src={`${photo.src.large || photo.src.original}?auto=format&fit=crop`}
                alt={photo.photographer}
                width={photo.width}
                height={photo.height}
                className="max-w-full h-auto"
                loading='lazy'
              />
            </Link>
          </div>
        ))}
      </div>
      </>
  );
};

export default PexelsApi;
