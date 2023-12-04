

import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState, useContext } from 'react';
import { fetchData } from '../api/Home.jsx';

const Photo = () => {
  const router = useRouter();
  const { id, theme } = router.query;
  const [photo, setPhoto] = useState(null);

  console.log('theme', theme);

  useEffect(() => {
    const fetchPhotoById = async () => {
      try {

        const data = await fetchData(undefined, theme);
        console.log(data);
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
