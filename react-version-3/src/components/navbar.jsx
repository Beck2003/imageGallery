import { Button } from '@mui/material';
import { useContext } from 'react';
import { SearchQueryContext } from '../context/mainContext';

export default function Navbar() {
  const { setSearchInput, setTheme, fetchDataAndSetCollection, themes } = useContext(SearchQueryContext);

  const handleButtonClick = async (theme) => {
    setSearchInput(''); // Clear search input
    setTheme(theme); // Set the theme

    try {
      // Call fetchDataAndSetCollection with the specific theme
      await fetchDataAndSetCollection([theme]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className='bg-gray-500 bg-opacity-50 absolute top-0 left-0 w-full backdrop-blur-md'>
      <nav className='flex justify-evenly z-5 '>
        <Button className='text-white ' onClick={() => handleButtonClick()}>Home</Button>
        <Button className='text-white ' onClick={() => handleButtonClick('city')}>City</Button>
        <Button className='text-white' onClick={() => handleButtonClick('country')}>Country</Button>
        <Button className='text-white' onClick={() => handleButtonClick('food')}>Food</Button>
        <Button className='text-white' onClick={() => handleButtonClick('people')}>People</Button>
      </nav>
    </div>
  );
}
