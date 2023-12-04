import SearchBar from './SearchBarLayout.js';
import Navbar from './navbar.jsx';
import { SearchQueryContextProvider } from '../context/mainContext.js';

const Layout = ({ children }) => {
  return (
    <SearchQueryContextProvider>
      <SearchBar />
      <Navbar />
      <main>{children}</main>
    </SearchQueryContextProvider>
  );
};

export default Layout;
