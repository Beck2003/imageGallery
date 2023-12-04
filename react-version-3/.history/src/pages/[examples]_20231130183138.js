import { useContext } from "react";
import PexelsApi from "./Main.jsx";
import { SearchQueryContext } from "@/context/mainContext.js";
import Layout from "@/components/layout.js";
import { useRouter } from "next/router.js";
const Examples = () => {
  const router = useRouter();
  return (
    <Layout>
      <h1 className='text-center'>{router.query.examples}</h1>
      <PexelsApi theme={router.query.examples} />
    </Layout>
  );
};

export default Examples;
