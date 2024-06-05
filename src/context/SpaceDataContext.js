import axios from "axios";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// import moment from "moment-timezone";

const SpaceDataContex = createContext();

export const SpaceDataProvider = ({ children }) => {
  const [spacexData, setSpacexData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(new Date());
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
      const date = new Date(value);
      const selectedisoDateString = date.toISOString();
      let url = "https://api.spacexdata.com/v3/launches";
      if (filters?.launchFilter) {
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
        if (filters?.timeFrameFilter !== "") {
          url += `?launch_date_utc=${selectedisoDateString}`;
        }
        const { data } = await axios.get(url);
        setSpacexData(data);
      }
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
      value={{
        spacexData,
        loading,
        filters,
        setFilters,
        handleSelectChange,
        value,
        setValue,
      }}
    >
      {children}
    </SpaceDataContex.Provider>
  );
};

export const useSpacexData = () => useContext(SpaceDataContex);
