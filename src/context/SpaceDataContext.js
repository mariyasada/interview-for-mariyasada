import axios from "axios";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { timeFrameFilter } from "../components/FilterBar/constants";

const SpaceDataContex = createContext();

export const SpaceDataProvider = ({ children }) => {
  const [spacexData, setSpacexData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    timeFrameFilter: "",
    launchFilter: "launches",
  });

  const handleSelectChange = (e) => {
    setFilters((prev) => ({ ...prev, launchFilter: e.target.value }));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = "https://api.spacexdata.com/v3/launches";
      switch (filters?.launchFilter) {
        case "upcomingLaunches":
          url = "https://api.spacexdata.com/v3/launches/upcoming";
          break;
        case "successlaunches":
          url += "?launch_success=true";
          break;
        case "failedlaunches":
          url += "?launch_success=false";
          break;
        case "pastLaunches":
          url = "https://api.spacexdata.com/v3/launches/past";
          break;
        default:
          url = "https://api.spacexdata.com/v3/launches";
          break;
      }
      const { data } = await axios.get(url);
      setSpacexData(data);
    } catch (err) {
      console.error(err, "something went wrong,can't fetched data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [filters?.launchFilter]);
  return (
    <SpaceDataContex.Provider
      value={{ spacexData, loading, filters, setFilters, handleSelectChange }}
    >
      {children}
    </SpaceDataContex.Provider>
  );
};

export const useSpacexData = () => useContext(SpaceDataContex);
