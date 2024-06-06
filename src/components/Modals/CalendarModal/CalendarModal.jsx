import React, { useState, useEffect } from "react";
import "./CalendarModal.css";
import { timeFrameFilter } from "../../FilterBar/constants";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSpacexData } from "../../../context/SpaceDataContext";
import { IoMdClose } from "react-icons/io";
import { timeformat } from "../../utils";

const CalendarModal = ({ setModal }) => {
  const {
    filters,
    setFilters,
    value,
    setValue,
    isDateSelected,
    setIsDateSelected,
  } = useSpacexData();
  const onChangeHandler = (newDate) => {
    setIsDateSelected(true);
    setValue(newDate);
    localStorage.setItem("selectedDate", timeformat(newDate));
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
    setIsDateSelected(false);
    setValue(newDate);
    localStorage.setItem("selectedDate", timeformat(newDate));
    setFilters((prev) => ({
      ...prev,
      timeFrameFilter: filterValue,
    }));
  };

  useEffect(() => {
    if (filters.timeFrameFilter && !isDateSelected) {
      handleFilterClick(filters.timeFrameFilter);
    }
  }, [filters.timeFrameFilter, isDateSelected]);

  return (
    <div className="modal-outer-container">
      <div className="modal-container-calender">
        <span className="close-icon">
          <IoMdClose color="gray" size={25} onClick={() => setModal(false)} />
        </span>
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
