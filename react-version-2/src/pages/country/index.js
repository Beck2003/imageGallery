import Navbar from "../../components/Navbar";
import ImageApiSet from "../api/pexelsApiSetPages";
const Country = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-center">Country</h1>
      <ImageApiSet theme= { 'country' }/>
    </div>
  );
};

export default Country;
