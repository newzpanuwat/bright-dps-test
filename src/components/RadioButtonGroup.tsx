import React, { useState } from "react";

const RadioButtonGroup: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("id");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label className="cap-typo">
        <input
          type="radio"
          name="sortName"
          value="name"
          checked={selectedOption === "name"}
          onChange={handleOptionChange}
          style={{ margin: "10px" }}
        />
        Sort Name
      </label>

      <label className="cap-typo">
        <input
          type="radio"
          style={{ margin: "10px" }}
          name="sortID"
          value="id"
          checked={selectedOption === "id"}
          onChange={handleOptionChange}
        />
        Sort ID
      </label>
    </div>
  );
};

export default RadioButtonGroup;
