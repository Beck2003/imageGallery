import { useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchQueryContext } from '@/context/mainContext';
import SearchBar from '@/components/SearchBar';

const PexelsApi = () => {
  const {
    searchInput,
    theme: contextTheme,
    setTheme: setContextTheme,
    setThemes: setContextThemes,
    collection,
  } = useContext(SearchQueryContext);

  useEffect(() => {
    setContextTheme(contextTheme);
  }, [contextTheme, setContextTheme]);

  return (
    <div className='columns-6'>
      <SearchBar />
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
  );
};

export default PexelsApi;
