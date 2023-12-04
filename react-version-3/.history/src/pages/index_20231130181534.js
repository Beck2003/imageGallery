import Navbar from '@/components/navbar';
import PexelsApi from '@/pages/Home';
import SearchBar from '@/components/SearchBarLayout.js';
import { SearchQueryContext } from '@/context/mainContext';
import { useContext } from 'react';
import Layout from '@/components/layout';

export default function Home() {
  const { searchInput, theme, themes, setThemes, setTheme} = useContext(SearchQueryContext);

  return (
    <Layout>
      <PexelsApi theme={theme} themes={themes} setThemes={setThemes} searchInput={searchInput} setTheme={setTheme} />
    </Layout>
  );
}
