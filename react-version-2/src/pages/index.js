import Navbar from "@/components/navbar";
import PexelsApi from "@/pages/api/PexlesApi";
import SearchBar from "@/components/SearchBarLayout.js";
import { SearchQueryContext } from "@/components/GlobalStates";
import { useContext } from "react";
import Layout from "@/components/layout";
export default function Home() {
  const { searchInput } = useContext(SearchQueryContext);

  return (
    <Layout>
      <SearchBar></SearchBar>
      <PexelsApi theme={searchInput}>
        <Navbar />
      </PexelsApi>
    </Layout>
  );
}
