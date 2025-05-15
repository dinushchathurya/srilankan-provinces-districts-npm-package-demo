import { useState } from "react";
import { getProvinces } from "srilankan-provinces-districts";
import { getUniversities } from "@dinush/srilankan-universities-faculties-degrees";

export default function Home({ provinces, universities }) {
  const [activeTab, setActiveTab] = useState("provinces");

  // Provinces state
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);

  // Universities state
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [degrees, setDegrees] = useState([]);

  // Provinces handlers
  async function handleProvinceChange(e) {
    const province = e.target.value;
    setSelectedProvince(province);

    if (province) {
      // Fetch districts from API route
      const res = await fetch(`/api/districts?province=${province}`);
      const data = await res.json();
      setDistricts(data);
    } else {
      setDistricts([]);
    }
  }

  // Universities handlers
  async function handleUniversityChange(e) {
    const university = e.target.value;
    setSelectedUniversity(university);
    setSelectedFaculty("");
    setDegrees([]);

    if (university) {
      // Fetch faculties from API route
      const res = await fetch(`/api/faculties?university=${university}`);
      const data = await res.json();
      setFaculties(data);
    } else {
      setFaculties([]);
    }
  }

  async function handleFacultyChange(e) {
    const faculty = e.target.value;
    setSelectedFaculty(faculty);

    if (faculty) {
      // Fetch degrees from API route
      const res = await fetch(
        `/api/degrees?university=${selectedUniversity}&faculty=${faculty}`
      );
      const data = await res.json();
      setDegrees(data);
    } else {
      setDegrees([]);
    }
  }

  // Styles
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
    gridList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "10px",
      listStyle: "none",
      padding: 0,
    },
  };

  return (
    <div style={styles.container}>
      <h1>Next.js Demo - Sri Lankan Data</h1>
      <p>
        Using server-side rendering with
        srilankan-provinces-districts@2.0.0-rc.1 and
        @dinush/srilankan-universities-faculties-degrees@2.0.0-rc.2
      </p>

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

      {/* Provinces Tab */}
      {activeTab === "provinces" && (
        <div>
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
              onChange={handleProvinceChange}
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
                <ul style={styles.gridList}>
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
              onChange={handleUniversityChange}
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
                onChange={handleFacultyChange}
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

// Server-side rendering
export async function getServerSideProps() {
  // Get provinces and universities on the server
  const provinces = getProvinces();
  const universities = getUniversities();

  return {
    props: {
      provinces,
      universities,
    },
  };
}
