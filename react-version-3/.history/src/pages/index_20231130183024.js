import Home from '@/pages/Home';
import { SearchQueryContext } from '@/context/mainContext';
import { useContext } from 'react';
import Layout from '@/components/layout';

export default function Home() {
  const { searchInput, theme, themes, setThemes, setTheme} = useContext(SearchQueryContext);

  return (
    <Layout>
      <Home theme={theme} themes={themes} setThemes={setThemes} searchInput={searchInput} setTheme={setTheme} />
    </Layout>
  );
}
