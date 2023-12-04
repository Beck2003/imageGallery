import React, { useEffect, useState } from 'react';

const ScrollDetector = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // You can adjust the scroll position threshold as needed
      const scrollThreshold = (window.outerHeight) ;

      if (window.scrollY > scrollThreshold -100) {
        setIsScrolled(true);
        
      } else {
        setIsScrolled(false);
      }
    };

    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
  isScrolled
  );
};

export { ScrollDetector } ;
