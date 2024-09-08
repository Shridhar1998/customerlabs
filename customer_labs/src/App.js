import React, { useState } from "react";
import "./App.css";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  const [currentSchema, setCurrentSchema] = useState("");

  const handleSaveSegment = () => {
    setShowPopup(!showPopup);
  };

  const handleAddSchema = (selectedValue) => {
    if (!selectedValue) return;
    const selectedOption = availableSchemas.find(
      (option) => option.value === selectedValue
    );
    if (selectedOption) {
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setAvailableSchemas(
        availableSchemas.filter((option) => option.value !== selectedValue)
      );
      setCurrentSchema(""); 
      // selected dropdown
    }
  };

  const handleSchemaChange = (index, newValue) => {
    const oldValue = selectedSchemas[index].value;
    const updatedSchemas = selectedSchemas.map((schema, i) => {
      if (i === index) {
        return schemaOptions.find((option) => option.value === newValue);
      }
      return schema;
    });
    setAvailableSchemas([
      ...availableSchemas.filter((option) => option.value !== newValue),
      schemaOptions.find((option) => option.value === oldValue),
    ]);
    setSelectedSchemas(updatedSchemas);
  };

  const handleRemoveSchema = (index) => {
    const removedSchema = selectedSchemas[index];
    setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index));
    setAvailableSchemas([...availableSchemas, removedSchema]);
  };

  const handleSubmit = () => {
    const schemaData = selectedSchemas.map((schema) => ({
      [schema.value]: schema.label,
    }));
    const payload = {
      segment_name: segmentName,
      schema: schemaData,
    };

   
    console.log("Payload to send:", payload);

    
    setSegmentName(""); 
    setSelectedSchemas([]); 
    setAvailableSchemas(schemaOptions); 
    setCurrentSchema(""); 

    setShowPopup(false);
  };


  const handleCancel = () => {
    setSegmentName(""); 
    setSelectedSchemas([]); 
    setAvailableSchemas(schemaOptions);
    setCurrentSchema(""); 

    setShowPopup(false); 
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-title">View Audience</div>
      </nav>
      <div className="save_segment">
        
        <button className="save-segment-btn" onClick={handleSaveSegment}>
          Save Segment
        </button>
      </div>

      {showPopup && (
        <div className={`popup ${showPopup ? "open" : ""}`}>
          <div className="popup-header">
            <h3 className="popup-title">Save Segment</h3>
          </div>
          <div className="popup-content">
            <label className="input-label">
              Enter Name Of the Segment :
              <input
                type="text"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
                placeholder="Enter segment name"
                className="input-box"
              />
            </label>

            <div className="blue-box">
              {selectedSchemas.map((schema, index) => (
                <div key={index} className="schema-item">
                  <select
                    value={schema.value}
                    onChange={(e) => handleSchemaChange(index, e.target.value)}
                    className="schema-dropdown"
                  >
                    {schemaOptions
                      .filter(
                        (option) =>
                          option.value === schema.value ||
                          !selectedSchemas.some((s) => s.value === option.value)
                      )
                      .map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveSchema(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <label className="input-label">
              Add schema to segment:
              <select
                value={currentSchema}
                onChange={(e) => setCurrentSchema(e.target.value)}
                className="schema-dropdown"
              >
                <option value="" disabled>
                  Select schema
                </option>
                {availableSchemas.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                className="add-btn"
                onClick={() => handleAddSchema(currentSchema)}
              >
                +Add new schema
              </button>
            </label>

            {/* Submit and Cancel Buttons */}
            <div className="button-group">
              <button className="submit-btn" onClick={handleSubmit}>
                Save the segment
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
