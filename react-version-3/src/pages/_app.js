import '@/styles/globals.css';
//import Layout from '../components/layout';
import { SearchQueryContextProvider } from '@/context/mainContext';
export default function App({ Component, pageProps }) {
  return (
    <SearchQueryContextProvider>
      <Component {...pageProps} />
    </SearchQueryContextProvider>
  );
}
