import React from "react";
import { TableHeading } from "./constants";
import "./TableComponent.css";
import { useSpacexData } from "../../context/SpaceDataContext";
import Loader from "../Loader/Loader";

const TableComponent = () => {
  const { spacexData, loading } = useSpacexData();

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const datePart = date.toLocaleDateString("en-GB", options);
    const timePart = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${datePart} at ${timePart}`;
  };

  const getLaunchStatus = (launch) => {
    if (launch?.upcoming) {
      return "Upcoming";
    } else if (launch?.launch_success) {
      return "Success";
    } else {
      return "Failed";
    }
  };
  return (
    <div className="table-container">
      <table className="table">
        <thead className="heading">
          <tr className="table-row ">
            {TableHeading?.map((heading) => {
              return <th className="table-heading">{heading}</th>;
            })}
          </tr>
        </thead>
        {loading ? (
          <Loader />
        ) : spacexData.length === 0 ? (
          <div className="noresult-row ">
            <div className="noresult">
              No Results found for specified filter
            </div>
          </div>
        ) : (
          <tbody>
            {spacexData?.map((spaceData) => (
              <tr key={spaceData.flight_number} className="table-content-row ">
                <td className="table-row-data ">
                  {spaceData?.flight_number < 10
                    ? `0${spaceData?.flight_number}`
                    : spaceData?.flight_number}
                </td>
                <td className="table-row-data ">
                  {formatDateTime(spaceData?.launch_date_utc)}
                </td>
                <td className="table-row-data ">
                  {spaceData?.launch_site?.site_name}
                </td>
                <td className="table-row-data ">{spaceData?.mission_name}</td>
                <td className="table-row-data ">
                  {spaceData?.rocket?.second_stage?.payloads[0]?.orbit}
                </td>
                <td>
                  <div
                    className={`table-row-data-div ${
                      getLaunchStatus(spaceData) === "Failed"
                        ? "status-failed"
                        : getLaunchStatus(spaceData) === "Upcoming"
                        ? "status-upcoming"
                        : "status-success"
                    }`}
                  >
                    {getLaunchStatus(spaceData)}
                  </div>
                </td>
                <td className={`table-row-data `}>
                  {spaceData?.rocket?.rocket_name}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TableComponent;
