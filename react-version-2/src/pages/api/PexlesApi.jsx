'use client';
import { useContext, useEffect, useState } from 'react';
import { createClient } from 'pexels';
import Link from 'next/link';
import Image from 'next/image';
import { SearchQueryContext} from '@/components/searchInputStateContext';
// ... (imports and context)
const PexelsApi = ({ theme }) => {
  const [collection, setCollection] = useState([]);
  const { searchInput } = useContext(SearchQueryContext);

  // const fetchData = async () => {
  //   console.log(theme)
  //   try {
  //     let data;
  //     if (!theme?.length && !searchInput?.length) {
  //       const client = createClient('RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V');
  //       data = await client.photos.curated({ per_page: 200 });
  //     } else {
  //       const client = createClient('RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V');
  //       data = await client.photos.search({ query: searchInput?.length ? searchInput : theme, per_page: 40 });
  //     }
  //     const photos = data?.photos || [];
  //     if (!theme?.length) {
  //       const selectedImages = getRandomImages(photos, 40);
  //       setCollection(selectedImages);
  //     } else {
  //       setCollection(photos);
  //     }
  //   } catch (error) {
  //     console.error('Error: ', error);
  //   }
  // };
  const getRandomImages = (arr, n) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  useEffect(() => {
console.log("useEffect");
    const fetchData = async () => {
      try {
        let data;
        console.log(theme)
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

    fetchData();
  }, [searchInput, theme]);
//console.log("hit");

  // Render the component
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