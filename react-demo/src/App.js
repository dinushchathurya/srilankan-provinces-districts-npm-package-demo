import React, { useState, useEffect } from "react";
import * as provincesData from "srilankan-provinces-districts";
import * as universitiesData from "@dinush/srilankan-universities-faculties-degrees";

function App() {
  const [activeTab, setActiveTab] = useState("provinces");

  // Provinces state
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);

  // Universities state
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [degrees, setDegrees] = useState([]);

  // Check for modern APIs
  const hasModernProvincesAPI = typeof provincesData.getProvince === "function";
  const hasModernUniversitiesAPI =
    typeof universitiesData.getAllUniversities === "function";

  // Load provinces data
  useEffect(() => {
    setProvinces(provincesData.getProvinces());
  }, []);

  // Load universities data
  useEffect(() => {
    setUniversities(universitiesData.getUniversities());
  }, []);

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      setDistricts(provincesData.getDistricts(selectedProvince));
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  // Load faculties when university changes
  useEffect(() => {
    if (selectedUniversity) {
      setFaculties(universitiesData.getFaculties(selectedUniversity));
      setSelectedFaculty("");
      setDegrees([]);
    } else {
      setFaculties([]);
      setSelectedFaculty("");
      setDegrees([]);
    }
  }, [selectedUniversity]);

  // Load degrees when faculty changes
  useEffect(() => {
    if (selectedUniversity && selectedFaculty) {
      setDegrees(
        universitiesData.getDegrees(selectedUniversity, selectedFaculty)
      );
    } else {
      setDegrees([]);
    }
  }, [selectedUniversity, selectedFaculty]);

  // Common styles
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
    },
    tabs: {
      display: "flex",
      borderBottom: "1px solid #ccc",
      marginBottom: "20px",
    },
    tab: {
      padding: "10px 20px",
      cursor: "pointer",
      borderBottom: "2px solid transparent",
    },
    activeTab: {
      fontWeight: "bold",
      borderBottom: "2px solid #0066cc",
      color: "#0066cc",
    },
    select: {
      padding: "8px",
      width: "100%",
      maxWidth: "300px",
      marginBottom: "15px",
    },
    itemList: {
      listStyle: "none",
      padding: 0,
    },
    item: {
      border: "1px solid #ddd",
      borderRadius: "4px",
      padding: "10px",
      backgroundColor: "#f9f9f9",
      marginBottom: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <h1>React Demo - Sri Lankan Data</h1>

      {/* Tabs */}
      <div style={styles.tabs}>
        <div
          style={{
            ...styles.tab,
            ...(activeTab === "provinces" ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab("provinces")}
        >
          Provinces & Districts
        </div>
        <div
          style={{
            ...styles.tab,
            ...(activeTab === "universities" ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab("universities")}
        >
          Universities & Degrees
        </div>
      </div>

      {/* Provinces & Districts Tab */}
      {activeTab === "provinces" && (
        <div>
          <p>Using srilankan-provinces-districts@2.0.0-rc.1</p>
          <p>Modern API available: {hasModernProvincesAPI ? "Yes" : "No"}</p>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="province-select"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Select Province:
            </label>
            <select
              id="province-select"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              style={styles.select}
            >
              <option value="">Select a province</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          {selectedProvince && (
            <div>
              <h2>Districts in {selectedProvince}</h2>
              {districts.length > 0 ? (
                <ul
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "10px",
                    ...styles.itemList,
                  }}
                >
                  {districts.map((district) => (
                    <li key={district} style={styles.item}>
                      {district}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No districts found for this province.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Universities Tab */}
      {activeTab === "universities" && (
        <div>
          <p>
            Using @dinush/srilankan-universities-faculties-degrees@2.0.0-rc.2
          </p>
          <p>Modern API available: {hasModernUniversitiesAPI ? "Yes" : "No"}</p>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="university-select"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Select University:
            </label>
            <select
              id="university-select"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              style={styles.select}
            >
              <option value="">Select a university</option>
              {universities.map((university) => (
                <option key={university} value={university}>
                  {university}
                </option>
              ))}
            </select>
          </div>

          {selectedUniversity && faculties.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="faculty-select"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Select Faculty:
              </label>
              <select
                id="faculty-select"
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                style={styles.select}
              >
                <option value="">Select a faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedUniversity && selectedFaculty && (
            <div>
              <h2>Degrees in {selectedFaculty}</h2>
              {degrees.length > 0 ? (
                <ul style={styles.itemList}>
                  {degrees.map((degree) => (
                    <li key={degree} style={styles.item}>
                      {degree}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No degrees found for this faculty.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
