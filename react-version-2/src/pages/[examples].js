import { useContext } from "react";
import PexelsApi from "./api/PexlesApi.jsx";
import { SearchQueryContext } from "@/components/GlobalStates.js";
import Layout from "@/components/layout.js";
import { useRouter } from "next/router.js";
import Navbar from "@/components/navbar.jsx";
const Examples = () => {
  const router = useRouter();
  return (
    <Layout>
      <PexelsApi theme={router.query.examples}></PexelsApi>
    </Layout>
  );
};

export default Examples;
