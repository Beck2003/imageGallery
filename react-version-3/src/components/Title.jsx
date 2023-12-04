import { useRouter } from "next/router";
import React from "react"
const Title = () => {
    const router = useRouter();
    const theme = router.query.examples
    return(
         <h1 className="text-white font-bold text-7xl text-center">Explore Imagery</h1>
         )
}
export default Title;