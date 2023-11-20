import React, { useEffect, useState } from 'react';
import { createClient } from 'pexels';
import Link from 'next/link';
import Image from 'next/image';
import SearchQueryState from '@/components/searchQuery';
let query = ''
async function FetchPexelsApi() {
  try {
    const client = createClient('RmnyE1ueR0YTPYy3POfjzBavsu1z1gjUiKdA7N2D7KtRtkDStsSIfl5V');
    const data = await client.photos.search({ query, per_page: 40 });
    return data;
  }catch(error){
    console.error('Error: ' + error)
  }

}

function ImageApiSet({ theme }) {
  const { searchInput, searchInputLength } = SearchQueryState();
  const [collection, setCollection] = useState([]);
   useEffect(() => {
    query = theme;
        FetchPexelsApi().then((data) => {
          const photos = data?.photos || [];
          setCollection(photos);
        });
      }, []);
  useEffect(() => {
    query = searchInput;
    FetchPexelsApi().then((data) => {
      const photos = data.photos;
      setCollection(photos);
    });
  }, [searchInputLength]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {collection && (
        <>
          {collection.map((photo) => (
            <div key={photo.id} style={{ gridColumn: 'span 1', gridRow: `span ${Math.ceil(photo.height / photo.width)}` }}>
              <Link href="/photos/[id]" as={`/photos/${photo.id}`}>
                <Image
                  src={`${photo.src.tiny}?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=280&w=200`}
                  alt={photo.photographer}
                  width={200}
                  height={photo.height * (200 / photo.width)}
                  layout="responsive"
                  className="max-w-full h-auto"
                />
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ImageApiSet;


// // example phto
// {
//     "id": 2014422,
//     "width": 3024,
//     "height": 3024,
//     "url": "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
//     "photographer": "Joey Farina",
//     "photographer_url": "https://www.pexels.com/@joey",
//     "photographer_id": 680589,
//     "avg_color": "#978E82",
//     "src": {
//       "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
//       "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//       "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
//       "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
//       "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
//       "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
//       "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
//       "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
//     },
//     "liked": false,
//     "alt": "Brown Rocks During Golden Hour"
//   }
// 