import React from "react";
import { launchesDetails, timeFrameFilter } from "./constants";
import { CiCalendar, CiFilter } from "react-icons/ci";
import "./FilterBar.css";

const FilterBar = () => {
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
        <select name="launchfilter" id="launchfilter" className="selectoption">
          {launchesDetails?.map((timeframe) => (
            <option value={timeframe} key={timeframe} className="option">
              {timeframe}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
