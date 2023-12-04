import { useRouter } from 'next/router';
import Image from 'next/image';
import { useContext, useEffect } from 'react';

const Photo = () => {
  const router = useRouter();

  // Get the photo ID from the route
  const { id, collection } = router.query;

  // Check if collection is available and convert id to a number
  const updatedCollection = collection ? JSON.parse(collection) : [];
  const photoId = id ? parseInt(id, 10) : null;

  // Find the selected photo from the collection
  const photo = updatedCollection.find((item) => item.id === photoId);
  return (
    <div className='relative top-0 left-0 z-0' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {photo && (
        <Image
          src={photo.src.original}
          alt="Photo"
          width={600}
          height={400}
          priority
        />
      )}
      <div className='absolute bottom-0  z-2 right-0 flex-row p-1 bg-gray-200 opacity-60'>
      <div className='text-grey text-xl italic font-extralight flex-row text-left'>Photo by {photo.photographer} , {photo.photographer_url}
      </div>
      </div>
      
    </div>
  );
};

export default Photo;
