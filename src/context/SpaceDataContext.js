import axios from "axios";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const SpaceDataContex = createContext();

export const SpaceDataProvider = ({ children }) => {
  const [spacexData, setSpacexData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://api.spacexdata.com/v3/launches"
      );
      setSpacexData(data);
      console.log(data[0]);
    } catch (err) {
      console.error(err, "something went wrong,can't fetched data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SpaceDataContex.Provider value={{ spacexData, loading }}>
      {children}
    </SpaceDataContex.Provider>
  );
};

export const useSpacexData = () => useContext(SpaceDataContex);
