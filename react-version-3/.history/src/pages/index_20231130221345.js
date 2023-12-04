import Main from '@/pages/Main';
import { SearchQueryContext } from '@/context/mainContext';
import { useContext } from 'react';
import Layout from '@/components/layout';
import SearchBar from '@/components/SearchBar';
import Navbar from '@/components/navbar';

export default function Home() {
  const { searchInput, theme, themes, setThemes, setTheme } =
    useContext(SearchQueryContext);

  return (
    <Layout>
      <div className='container'>
        <SearchBar />
        <Navbar />
        <Main
          theme={theme}
          themes={themes}
          setThemes={setThemes}
          searchInput={searchInput}
          setTheme={setTheme}
        />
      </div>
    </Layout>
  );
}
