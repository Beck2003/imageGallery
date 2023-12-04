import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SearchQueryContext } from '../context/mainContext';
export default function Navbar() {
  const router = useRouter();
  const { setSearchInput } = useContext(SearchQueryContext);
  const handleButtonClick = (title) => {
    setSearchInput([]);
    if (!title) {
      router.push(`/`);
    } else {
      router.push(`/${title}`);
    }
  };
  return (
    <div className='bg-opacity-95 absolute top-0 left-0 w-full'>
      <nav className='flex justify-evenly z-5 '>
        <Button onClick={() => handleButtonClick()}>Home</Button>
        <Button onClick={() => handleButtonClick('city')}>City</Button>
        <Button onClick={() => handleButtonClick('country')}>Country</Button>
        <Button onClick={() => handleButtonClick('food')}>Food</Button>
        <Button onClick={() => handleButtonClick('people')}>People</Button>
      </nav>
    </div>
  );
}
