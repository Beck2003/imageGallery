import { useRouter } from "next/router.js";
import { useContext } from "react";
import { SearchQueryContext } from "./GlobalStates";
const Title = () => {
    const router = useRouter()
    const {searchInput} =useContext(SearchQueryContext)
return(
    <h1 className='text-center font-bold text-white text-6xl'>{searchInput.length>0 ? searchInput : router.query.examples}</h1>
)
}
export default Title;