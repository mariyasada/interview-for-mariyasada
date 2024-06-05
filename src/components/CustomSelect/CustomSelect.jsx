import React, { useState } from "react";
import { timeFrameFilter } from "../FilterBar/constants";

const CustomSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div className="custom-select-container">
      <div className="custom-select-header" onClick={handleToggle}>
        {selectedOption ? selectedOption : "Select an option"}
      </div>
      {isOpen && (
        <ul className="custom-select-list">
          {timeFrameFilter.map((option) => (
            <li
              key={option}
              className={`custom-select-option ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
