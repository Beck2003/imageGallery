import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SearchQueryContext } from './searchInputStateContext';
export default function Navbar() {
  const router = useRouter();
  const { setSearchInput } = useContext(SearchQueryContext)
const handleButtonClick = (title) => {
  setSearchInput([]);
  if(!title) {
    router.push(`/`)
  } else {
  router.push(`/${title}`)
}
}
  return (
    <nav className='flex justify-evenly z-5'>
      <Button onClick={()=>handleButtonClick()}>Home</Button>
      <Button onClick={()=>handleButtonClick('city')} >City</Button>
      <Button onClick={()=>handleButtonClick('country')} >Country</Button>
      <Button onClick={()=>handleButtonClick('food')} >Food</Button>
      <Button onClick={()=>handleButtonClick('people')} >People</Button>
    </nav>
  );
};