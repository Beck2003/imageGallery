

import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PexelsApi from '../api/PexlesApi.jsx'; // Adjust the path accordingly
//import { fetchData } from '../api/PexlesApi.jsx';

const Photo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotoById = async () => {
      try {
        const data = await fetchData(undefined, undefined);
        const photoData = data.photos.find((photo) => photo.id === parseInt(id));
  
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
