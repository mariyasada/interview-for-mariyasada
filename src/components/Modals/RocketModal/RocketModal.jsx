import React from "react";
import "./RocketModal.css";
import { IoMdClose } from "react-icons/io";
import { PiYoutubeLogoThin } from "react-icons/pi";
import { SiNasa } from "react-icons/si";
import { FaWikipediaW } from "react-icons/fa";
import { formatDateTime, getLaunchStatus } from "../../utils";
import { useNavigate } from "react-router";

const RocketModal = ({ singleRocketData, setModal }) => {
  const { links, launch_site, rocket, details, flight_number, mission_name } =
    singleRocketData;

  const navigateToLink = (link) => {
    window.open(link, "_blank");
  };
  return (
    <div className="modal-outer-container">
      <div className="modal-container">
        <span className="close-icon">
          <IoMdClose color="gray" size={25} onClick={() => setModal(false)} />
        </span>
        <div className="image-and-status-container">
          <img src={links?.mission_patch_small} alt="rocket_image" />
          <div className="status-and-name-container">
            <div className="status-container">
              <div>{launch_site?.site_name}</div>
              <div
                className={`table-row-data-div ${
                  getLaunchStatus(singleRocketData) === "Failed"
                    ? "status-failed"
                    : getLaunchStatus(singleRocketData) === "Upcoming"
                    ? "status-upcoming"
                    : "status-success"
                }`}
              >
                {getLaunchStatus(singleRocketData)}
              </div>
            </div>
            <div className="rocket_name">
              <p>{rocket?.rocket_name}</p>
            </div>
            <div className="icons-container">
              <SiNasa
                onClick={() => navigateToLink(`${links?.article_link}`)}
              />
              <FaWikipediaW
                onClick={() => navigateToLink(`${links?.wikipedia}`)}
              />
              <PiYoutubeLogoThin
                onClick={() => navigateToLink(`${links?.video_link}`)}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="description">
            {details}
            <span
              onClick={() => navigateToLink(`${links?.wikipedia}`)}
              className="link"
            >
              Wikipedia
            </span>
          </p>
        </div>
        <div className="all-details-container">
          <div>
            <div className="title"> Flight Number</div>
            <div className="normal-text">{flight_number}</div>
          </div>
          <div>
            <div className="title">Mission Name</div>
            <div className="normal-text">{mission_name}</div>
          </div>
          <div>
            <div className="title">Rocket Type</div>
            <div className="normal-text">{rocket?.rocket_type}</div>
          </div>
          <div>
            <div className="title">Rocket Name</div>
            <div className="normal-text">{rocket?.rocket_name}</div>
          </div>
          <div>
            <div className="title">Nationality</div>
            <div className="normal-text">
              {rocket?.second_stage?.payloads[0]?.nationality}
            </div>
          </div>
          <div>
            <div className="title">Launch Date</div>
            <div className="normal-text">
              {formatDateTime(singleRocketData?.launch_date_utc)}
            </div>
          </div>
          <div>
            <div className="title">Payload Type</div>
            <div className="normal-text">
              {rocket?.second_stage?.payloads[0]?.payload_type}
            </div>
          </div>
          <div>
            <div className="title">Orbit</div>
            <div className="normal-text">
              {rocket?.second_stage?.payloads[0]?.orbit}
            </div>
          </div>
          <div style={{ border: "none" }}>
            <div className="title">Launch Site</div>
            <div className="normal-text">{launch_site?.site_name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RocketModal;
