import { useRouter } from "next/router.js";
const Title = () => {
    const router = useRouter()
return(
    <h1 className='text-center'>{router.query.examples}</h1>
)
}
export default Title;