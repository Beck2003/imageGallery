import { useContext } from "react";
import PexelsApi from "./api/PexlesApi.jsx";
import { SearchQueryContext } from "@/components/searchInputStateContext.js";
import Layout from "@/components/layout.js";
import { useRouter } from "next/router.js";
const Examples = () => {
  const router = useRouter();
  return (
    <Layout>
      
      <PexelsApi theme={router.query.examples}>
      </PexelsApi>

    </Layout>
  );
};

export default Examples;
