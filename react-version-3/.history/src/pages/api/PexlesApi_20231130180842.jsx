import { useContext, useEffect, useState } from 'react';
import { createClient } from 'pexels';
import Link from 'next/link';
import Image from 'next/image';
import { SearchQueryContext } from '@/components/searchInputStateContext';
import SearchBar from '@/components/SearchBarLayout';
//import { useReducer } from 'react';
export const fetchData = async (searchInput, themes) => {
  console.log('searchInput', searchInput, 'themes', themes);
  try {
    let data;
    if (!themes?.length && !searchInput?.length) {
      const client = createClient(
        'RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V'
      );
      data = await client.photos.curated({ per_page: 200 });
    } else {
      const client = createClient(
        'RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V'
      );
      data = await client.photos.search({
        query: searchInput?.length ? searchInput : themes,
        per_page: 40
      });
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
const PexelsApi = ({
  theme: contextTheme,
  themes: contextThemes,
  setTheme: setContextTheme,
  setThemes: setContextThemes,
  searchInput
}) => {
  const [collection, setCollection] = useState([]);

  console.log(contextTheme, contextThemes);
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
        // console.error('Error fetching data:', error);
      }
    };
    console.log('ran useEffect in PexelsApi');
    fetchDataAndSetCollection();
  }, [searchInput, contextTheme, contextThemes, setContextThemes]);

  // console.log(collection);

  return (
    <>
      <SearchBar
        searchInput={searchInput}
        contextTheme={contextTheme}
        contextThemes={contextThemes}
        setContextThemes={setContextThemes}
        setContextTheme={setContextTheme}
      />
      <div className='columns-6'>
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
    </>
  );
};
export default PexelsApi;
