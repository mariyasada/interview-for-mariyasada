import React from "react";
import { launchesDetails, timeFrameFilter } from "./constants";
import { CiCalendar, CiFilter } from "react-icons/ci";
import "./FilterBar.css";
import { useSpacexData } from "../../context/SpaceDataContext";

const FilterBar = () => {
  const { filters, setFilters, handleSelectChange } = useSpacexData();

  return (
    <div className="filtercontainer">
      <div className="timeframefilter">
        <CiFilter size={20} />
        <select name="timeframe" id="timeframefilter" className="selectoption">
          {timeFrameFilter?.map((timeframe) => (
            <option value={timeframe} key={timeframe} className="option">
              {timeframe}
            </option>
          ))}
        </select>
      </div>
      <div className="timeframefilter">
        <CiFilter size={20} />
        <select
          name={filters?.launchFilter}
          id={filters?.launchFilter}
          className="selectoption"
          value={filters?.launchFilter}
          onChange={(e) => handleSelectChange(e)}
        >
          {launchesDetails?.map((launches) => (
            <option
              value={launches?.value}
              key={launches.name}
              className={
                launches?.value === filters?.launchFilter
                  ? "option selected"
                  : "option"
              }
            >
              {launches.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
