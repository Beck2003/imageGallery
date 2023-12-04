// pages/photos/[id].js
import Image from 'next/image';
import { fetchData } from '../api/PexlesApi.jsx';
import { SearchQueryContext } from '@/components/searchInputStateContext.js';
import { useContext } from 'react';

const Photo = ({ photo }) => {
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

export async function getServerSideProps({ params }) {
  const { id } = params;
  const {theme} = useContext(SearchQueryContext);

  console.log(theme);
  try {
    const data = await fetchData(undefined, theme);
    const photo = data.find((photo) => photo.id === parseInt(id));

    return {
      props: {
        photo,
      },
    };
  } catch (error) {
    console.error('Error fetching photo:', error);
    return {
      props: {
        photo: null,
      },
    };
  }
}

export default Photo;
