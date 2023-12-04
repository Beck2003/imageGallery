import SearchBar from "./SearchBarLayout.js";
import Navbar from "./navbar.jsx";
import { SearchQueryContextProvider } from "./GlobalStates.js";

const Layout = ({ children }) => {
  return (
    <SearchQueryContextProvider>
      {/* <Navbar /> */}
      {/* <SearchBar /> */}
      <main>{children}</main>
    </SearchQueryContextProvider>
  );
};

export default Layout;
