import Navbar from './navbar.jsx';
import { SearchQueryContextProvider } from '../context/mainContext.js';

const Layout = ({ children }) => {
  return (
    <SearchQueryContextProvider>
      <Navbar />
      <main>{children}</main>
    </SearchQueryContextProvider>
  );
};

export default Layout;
