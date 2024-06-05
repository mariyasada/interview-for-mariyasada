import React, { useState, useEffect } from "react";
import "./CalendarModal.css";
import { timeFrameFilter } from "../../FilterBar/constants";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSpacexData } from "../../../context/SpaceDataContext";

const CalendarModal = ({ setModal }) => {
  const { filters, setFilters, value, setValue } = useSpacexData();
  const onChangeHandler = (newDate) => {
    setValue(newDate);
  };

  const handleFilterClick = (filterValue) => {
    let newDate = new Date();
    switch (filterValue) {
      case "pastweek":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "pastmonth":
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case "pastthreemonths":
        newDate.setMonth(newDate.getMonth() - 3);
        break;
      case "pastsixmonths":
        newDate.setMonth(newDate.getMonth() - 6);
        break;
      case "pastyear":
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
      case "pasttwoyears":
        newDate.setFullYear(newDate.getFullYear() - 2);
        break;
      default:
        break;
    }
    setValue(newDate);
    setFilters((prev) => ({
      ...prev,
      timeFrameFilter: filterValue,
    }));
  };

  useEffect(() => {
    if (filters.timeFrameFilter) {
      handleFilterClick(filters.timeFrameFilter);
    }
  }, [filters.timeFrameFilter]);

  return (
    <div className="modal-outer-container">
      <div className="modal-container-calender" onClick={() => setModal(false)}>
        <div className="filters">
          {timeFrameFilter?.map((filter) => (
            <div
              className={
                filter?.value === filters?.timeFrameFilter
                  ? "filter-name selected-filter"
                  : "filter-name"
              }
              onClick={() => handleFilterClick(filter?.value)}
            >
              {filter.name}
            </div>
          ))}
        </div>
        <div className="custom-calendar-container">
          <Calendar onChange={onChangeHandler} value={value} />
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
