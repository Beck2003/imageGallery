

import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState, useContext } from 'react';
import { fetchData } from '../api/PexlesApi.jsx';
import { SearchQueryContext } from '@/components/searchInputStateContext';


const Photo = ({theme}) => {
  const router = useRouter();
  const { id, query } = router.query;
  const [photo, setPhoto] = useState(null);
  const context = useContext(SearchQueryContext);

  console.log('theme', context.theme);

  useEffect(() => {
    const fetchPhotoById = async () => {
      try {
        console.log('context', context.theme);
        const data = await fetchData(undefined, query.theme);
        // console.log(data);
        const photoData = data.find((photo) => photo.id === parseInt(id));
  
        if (photoData) {
          setPhoto(photoData);
        } else {
          console.error('Photo data not found for id:', id);
        }
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };
  
    fetchPhotoById();
  }, [id]);

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {photo && (
        <Image
          src={photo.src.original}
          alt="Photo"
          width={600}
          height={400}
          priority
        />
      )}
    </div>
  );
};



export default Photo;
