import { useContext, useEffect, useReducer, useState } from 'react';
import { createClient } from 'pexels';
import Link from 'next/link';
import Image from 'next/image';
import { SearchQueryContext } from '@/components/searchInputStateContext';
//import { useReducer } from 'react';
export const fetchData = async (searchInput, theme) => {
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
// PexelsApi.jsx
// PexelsApi.jsx
const PexelsApi = () => {
  const [collection, setCollection] = useState([]);
  const { searchInput, setCollection: setContextCollection, setTheme: setContextTheme, theme } = useContext(SearchQueryContext);

  useEffect(() => {
    const fetchDataAndSetCollection = async () => {
      try {
        const photos = await fetchData(searchInput, theme); // Use theme from context
        if (!theme?.length) {
          const selectedImages = getRandomImages(photos, 40);
          setCollection(selectedImages);
        } else {
          setCollection(photos);
        }
        setContextCollection(photos);
        setContextTheme(theme);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataAndSetCollection();
  }, [searchInput, theme, setContextCollection]);

  // Log the theme outside of useEffect to capture the updated value
  console.log('theme', theme);

  return (
    <div className='columns-6'>
      {collection.map((photo) => (
        <div key={photo.id} className='mb-4'>
          <Link href="/photos/[id]" as={`/photos/${photo.id}`} passHref>
            <Image
              src={`${photo.src.large || photo.src.original}?auto=format&fit=crop`}
              alt={photo.photographer}
              width={photo.width}
              height={photo.height}
              className="max-w-full h-auto"
              priority
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PexelsApi;

