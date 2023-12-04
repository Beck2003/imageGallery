// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import PexelsApi from '../api/PexlesApi'; // Adjust the path accordingly

// const Photo = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [photo, setPhoto] = useState(null);

//   useEffect(() => {
// const fetchPhotoById = async (id) => {
// try {
// Fetch the photos using the FetchPexelsApi function
//  const data = await PexelsApi();
//  const photoData = data.photos.find(photo => photo.id === parseInt(id));
// const collection = PexelsApi({ theme: undefined });
// console.log(collection);
// const photoData = collection.find((photo) => photo.id === parseInt(id));
// console.log(photoData);
//     if (photoData) {
//       setPhoto(photoData);
//     } else {
//       console.error('Photo data not found for id:', id);
//     }
//   } catch (error) {
//     console.error('Error fetching photo:', error);
//   }
// };
//     const fetchPhotoById = async () => {
//       try {
//         const photoData = await PexelsApi.fetchPhotoById(id);
//        // console.log(collection);
//         if (photoData) {
//           setPhoto(photoData);
//         } else {
//           console.error('Photo data not found for id:', id);
//         }
//       } catch (error) {
//         console.error('Error fetching photo:', error);
//       }
//     };

//     fetchPhotoById();
//   }, [id]);

//   return (
//     <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       {photo && (
//         <Image
//           src={photo.src.original}
//           alt="Photo"
//           width={600}
//           height={400}
//           priority
//         />
//       )}
//     </div>
//   );
// };

// export default Photo;

import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { fetchData } from "../api/PexlesApi.jsx";
import { SearchQueryContext } from "@/components/GlobalStates.js";

const Photo = () => {
  const router = useRouter();
  const { id, theme } = router.query;
  const [photo, setPhoto] = useState(null);

  const { collection } = useContext(SearchQueryContext);
  console.log("id collection:", collection, "photo.id: " + id);
  useEffect(() => {
    if (id && collection) {
      const findPhoto = collection.find((photo) => photo.id === parseInt(id));
      setPhoto(findPhoto);
    }
  }, [router.query, id]);

  // useEffect(() => {
  //   const fetchPhotoById = async () => {
  //     try {

  //       const data = await fetchData(undefined, theme);
  //       console.log('ids data:',  data )
  //       const photoData = data.find((photo) => photo.id === parseInt(id));

  //       if (photoData) {
  //         setPhoto(photoData);
  //       } else {
  //         console.error('Photo data not found for id:', id);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching photo:', error);
  //     }
  //   };

  //   fetchPhotoById();
  // }, [id]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {photo && (
        <Image
          src={photo.src.original}
          alt='Photo'
          width={600}
          height={400}
          priority
        />
      )}
    </div>
  );
};

export default Photo;
