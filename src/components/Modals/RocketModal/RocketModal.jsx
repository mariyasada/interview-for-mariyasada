import React from "react";
import "./RocketModal.css";
import { IoMdClose } from "react-icons/io";
import { PiYoutubeLogoThin } from "react-icons/pi";
import { SiNasa } from "react-icons/si";
import { FaWikipediaW } from "react-icons/fa";
import { formatDateTime, getLaunchStatus } from "../../utils";
import { useNavigate } from "react-router";

const RocketModal = ({ singleRocketData, setModal }) => {
  console.log(singleRocketData, "data hai bhai");
  const navigate = useNavigate();
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
            <div> Flight Number</div>
            <div>{flight_number}</div>
          </div>
          <div>
            <div>Mission Name</div>
            <div>{mission_name}</div>
          </div>
          <div>
            <div>Rocket Type</div>
            <div>{rocket?.rocket_type}</div>
          </div>
          <div>
            <div>Rocket Name</div>
            <div>{rocket?.rocket_name}</div>
          </div>
          <div>
            <div>Nationality</div>
            <div>{rocket?.second_stage?.payloads[0]?.nationality}</div>
          </div>
          <div>
            <div>Launch Date</div>
            <div>{formatDateTime(singleRocketData?.launch_date_utc)}</div>
          </div>
          <div>
            <div>Payload Type</div>
            <div>{rocket?.second_stage?.payloads[0]?.payload_type}</div>
          </div>
          <div>
            <div>Orbit</div>
            <div>{rocket?.second_stage?.payloads[0]?.orbit}</div>
          </div>
          <div style={{ border: "none" }}>
            <div>Launch Site</div>
            <div>{launch_site?.site_name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RocketModal;
