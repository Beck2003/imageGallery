// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// const Photo = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [photo, setPhoto] = useState(null);

//   useEffect(() => {
//     const fetchPhotoById = async () => {
//       try {
//         if (id) {
//           // Fetch the specific photo data based on the id from the Pexels API
//           const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
//             headers: {
//               Authorization: 'RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V', // Replace with your actual Pexels API key
//             },
//           });

//           if (response.ok) {
//             const data = await response.json();
//             // Set the photo state with the fetched data
//             setPhoto(data);
//           } else {
//             console.error('Error fetching photo:', response.statusText);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching photo:', error);
//       }
//     };

//     fetchPhotoById();
//   }, [id]);

// //  const objectFitValue = photo?.height > photo?.width ? 'contain' : 'cover';

//   return (
//     <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       {photo && (
//         <Image
//           src={photo.src.original}
//           alt="Photo"
//           width={600}
//           height={400}
//           // layout='fixed'
//           objectFit="contain"
//           // objectFit={objectFitValue}
//           priority
//         />
//       )}
//     </div>
//   );
// };

// export default Photo;



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
        // Fetch the photos using the FetchPexelsApi function
      //  const data = await PexelsApi();
      //  const photoData = data.photos.find(photo => photo.id === parseInt(id));
        const data = await PexelsApi.fetchData(undefined, undefined);
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
