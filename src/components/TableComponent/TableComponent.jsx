import React, { useState, useEffect } from "react";
import { TableHeading } from "./constants";
import "./TableComponent.css";
import { useSpacexData } from "../../context/SpaceDataContext";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import RocketModal from "../Modals/RocketModal/RocketModal";
import { formatDateTime, getLaunchStatus } from "../utils";

const TableComponent = () => {
  const { spacexData, loading } = useSpacexData();
  const dataperPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modal, setModal] = useState(false);
  const [singleRocketData, setSingleRocketData] = useState(null);

  useEffect(() => {
    if (spacexData?.length > 0) {
      setTotalPages(Math.ceil(spacexData.length / dataperPage)); //111/12 ==> 10
    }
  }, [spacexData, dataperPage]);

  const endIndex = dataperPage * currentPage; // 12*1=12
  const startIndex = endIndex - dataperPage; //12-12=0
  const paginatedSpaceData = spacexData?.slice(startIndex, endIndex); //(0,12)==11

  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead className="heading">
            <tr className="table-row-heading ">
              {TableHeading?.map((heading) => {
                return <th className="table-heading">{heading}</th>;
              })}
            </tr>
          </thead>

          {loading && <Loader />}
          {!loading && paginatedSpaceData?.length === 0 ? (
            <div className="noresult-row ">
              <div className="noresult">
                No Results found for specified filter
              </div>
            </div>
          ) : (
            <tbody>
              {!loading &&
                paginatedSpaceData?.map((spaceData) => (
                  <tr
                    key={spaceData.flight_number}
                    className="table-content-row "
                    onClick={() => {
                      setModal(true);
                      setSingleRocketData(spaceData);
                    }}
                  >
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
                    <td className="table-row-data ">
                      {spaceData?.mission_name}
                    </td>
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
      <Pagination
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      {modal && (
        <RocketModal
          modal={modal}
          setModal={setModal}
          singleRocketData={singleRocketData}
        />
      )}
    </>
  );
};

export default TableComponent;
