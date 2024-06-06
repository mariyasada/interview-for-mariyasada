import React, { useState } from "react";
import { launchesDetails, timeFrameFilter } from "./constants";
import { CiCalendar, CiFilter } from "react-icons/ci";
import "./FilterBar.css";
import { useSpacexData } from "../../context/SpaceDataContext";
import CalendarModal from "../Modals/CalendarModal/CalendarModal";
import { IoIosArrowDown } from "react-icons/io";
import { findRangeFilter } from "../utils";

const FilterBar = () => {
  const { filters, setFilters, handleSelectChange } = useSpacexData();
  const [modal, setModal] = useState(false);

  return (
    <div className="filtercontainer">
      <div className="pastfilter" onClick={() => setModal(true)}>
        <CiCalendar size={20} />
        <p>
          {findRangeFilter(filters?.timeFrameFilter)?.name ?? "Past 6 Months"}
        </p>
        <span style={{ marginTop: "7px" }}>
          <IoIosArrowDown />
        </span>
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
        <div
          className="clear-filters"
          onClick={() =>
            setFilters({
              timeFrameFilter: "",
              launchFilter: "launches",
            })
          }
        >
          <p>Clear filters</p>
        </div>
      </div>
      {modal && <CalendarModal setModal={setModal} />}
    </div>
  );
};

export default FilterBar;
