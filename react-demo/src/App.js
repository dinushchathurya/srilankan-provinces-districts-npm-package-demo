import React, { useState, useEffect } from "react";
import * as provincesData from "srilankan-provinces-districts";
import * as universitiesData from "@dinush/srilankan-universities-faculties-degrees";

function App() {
  const [activeTab, setActiveTab] = useState("provinces");

  // Provinces state
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);

  // Legacy Universities state
  const [legacyUniversities, setLegacyUniversities] = useState([]);
  const [selectedLegacyUniversity, setSelectedLegacyUniversity] = useState("");
  const [legacyFaculties, setLegacyFaculties] = useState([]);
  const [selectedLegacyFaculty, setSelectedLegacyFaculty] = useState("");
  const [legacyDegrees, setLegacyDegrees] = useState([]);

  // Modern Universities state
  const [modernUniversities, setModernUniversities] = useState([]);
  const [selectedModernUniversity, setSelectedModernUniversity] = useState("");
  const [modernFaculties, setModernFaculties] = useState([]);
  const [selectedModernFaculty, setSelectedModernFaculty] = useState("");
  const [modernDegrees, setModernDegrees] = useState([]);

  // Check for modern APIs
  const hasModernProvincesAPI = typeof provincesData.getProvince === "function";
  const hasModernUniversitiesAPI =
    typeof universitiesData.getAllUniversities === "function";

  // Load provinces data
  useEffect(() => {
    setProvinces(provincesData.getProvinces());
  }, []);

  // Load Legacy universities data
  useEffect(() => {
    setLegacyUniversities(universitiesData.getUniversities());
  }, []);

  // Load Modern universities data
  useEffect(() => {
    if (hasModernUniversitiesAPI) {
      const allUniversities = universitiesData.getAllUniversities();
      setModernUniversities(allUniversities.map(u => u.name));
    }
  }, [hasModernUniversitiesAPI]);

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      setDistricts(provincesData.getDistricts(selectedProvince));
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  // Load Legacy faculties when university changes
  useEffect(() => {
    if (selectedLegacyUniversity) {
      setLegacyFaculties(universitiesData.getFaculties(selectedLegacyUniversity));
      setSelectedLegacyFaculty("");
      setLegacyDegrees([]);
    } else {
      setLegacyFaculties([]);
      setSelectedLegacyFaculty("");
      setLegacyDegrees([]);
    }
  }, [selectedLegacyUniversity]);

  // Load Legacy degrees when faculty changes
  useEffect(() => {
    if (selectedLegacyUniversity && selectedLegacyFaculty) {
      setLegacyDegrees(
        universitiesData.getDegrees(selectedLegacyUniversity, selectedLegacyFaculty)
      );
    } else {
      setLegacyDegrees([]);
    }
  }, [selectedLegacyUniversity, selectedLegacyFaculty]);

  // Load Modern faculties when university changes
  useEffect(() => {
    if (selectedModernUniversity) {
      const facultiesList = universitiesData.getFacultiesByUniversity(selectedModernUniversity);
      setModernFaculties(facultiesList.map(f => f.name));
      setSelectedModernFaculty("");
      setModernDegrees([]);
    } else {
      setModernFaculties([]);
      setSelectedModernFaculty("");
      setModernDegrees([]);
    }
  }, [selectedModernUniversity]);

  // Load Modern degrees when faculty changes
  useEffect(() => {
    if (selectedModernUniversity && selectedModernFaculty) {
      const degreesList = universitiesData.getDegreesByFaculty(
        selectedModernUniversity, 
        selectedModernFaculty
      );
      setModernDegrees(degreesList.map(d => d.name));
    } else {
      setModernDegrees([]);
    }
  }, [selectedModernUniversity, selectedModernFaculty]);

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
      fontSize: "14px",
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
            ...(activeTab === "legacy-universities" ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab("legacy-universities")}
        >
          Universities - Legacy API
        </div>
        <div
          style={{
            ...styles.tab,
            ...(activeTab === "modern-universities" ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab("modern-universities")}
        >
          Universities - Modern API
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

      {/* Legacy Universities Tab */}
      {activeTab === "legacy-universities" && (
        <div>
          <p>Using @dinush/srilankan-universities-faculties-degrees@2.0.0-rc.7</p>
          <p><strong>Legacy API</strong> - using getUniversities(), getFaculties(), getDegrees()</p>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="legacy-university-select"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Select University:
            </label>
            <select
              id="legacy-university-select"
              value={selectedLegacyUniversity}
              onChange={(e) => setSelectedLegacyUniversity(e.target.value)}
              style={styles.select}
            >
              <option value="">Select a university</option>
              {legacyUniversities.map((university) => (
                <option key={university} value={university}>
                  {university}
                </option>
              ))}
            </select>
          </div>

          {selectedLegacyUniversity && legacyFaculties.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="legacy-faculty-select"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Select Faculty:
              </label>
              <select
                id="legacy-faculty-select"
                value={selectedLegacyFaculty}
                onChange={(e) => setSelectedLegacyFaculty(e.target.value)}
                style={styles.select}
              >
                <option value="">Select a faculty</option>
                {legacyFaculties.map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedLegacyUniversity && selectedLegacyFaculty && (
            <div>
              <h2>Degrees in {selectedLegacyFaculty}</h2>
              {legacyDegrees.length > 0 ? (
                <ul style={styles.itemList}>
                  {legacyDegrees.map((degree, index) => (
                    <li key={`legacy-${degree}-${index}`} style={styles.item}>
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

      {/* Modern Universities Tab */}
      {activeTab === "modern-universities" && (
        <div>
          <p>Using @dinush/srilankan-universities-faculties-degrees@2.0.0-rc.7</p>
          <p><strong>Modern API</strong> - using getAllUniversities(), getFacultiesByUniversity(), getDegreesByFaculty()</p>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="modern-university-select"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Select University:
            </label>
            <select
              id="modern-university-select"
              value={selectedModernUniversity}
              onChange={(e) => setSelectedModernUniversity(e.target.value)}
              style={styles.select}
            >
              <option value="">Select a university</option>
              {modernUniversities.map((university) => (
                <option key={university} value={university}>
                  {university}
                </option>
              ))}
            </select>
          </div>

          {selectedModernUniversity && modernFaculties.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="modern-faculty-select"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Select Faculty:
              </label>
              <select
                id="modern-faculty-select"
                value={selectedModernFaculty}
                onChange={(e) => setSelectedModernFaculty(e.target.value)}
                style={styles.select}
              >
                <option value="">Select a faculty</option>
                {modernFaculties.map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedModernUniversity && selectedModernFaculty && (
            <div>
              <h2>Degrees in {selectedModernFaculty}</h2>
              {modernDegrees.length > 0 ? (
                <ul style={styles.itemList}>
                  {modernDegrees.map((degree, index) => (
                    <li key={`modern-${degree}-${index}`} style={styles.item}>
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