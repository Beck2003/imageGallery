import Navbar from "@/components/navbar";
import PexelsApi from "@/pages/api/PexlesApi";
import SearchBar from "@/components/SearchBarLayout.js";
import { SearchQueryContext } from "@/components/searchInputStateContext";
import { useContext } from "react";
import Layout from "@/components/layout";

export default function Home() {
  const { searchInput } = useContext(SearchQueryContext);
  
  return (
    <Layout>
         <PexelsApi theme= {searchInput }/>
       </Layout>
  )
}
