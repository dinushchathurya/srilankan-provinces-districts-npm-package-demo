import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('provinces');
  
  // Provinces state
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState([]);

  
  // Legacy API state
  const [legacyUniversities, setLegacyUniversities] = useState([]);
  const [selectedLegacyUniversity, setSelectedLegacyUniversity] = useState('');
  const [legacyFaculties, setLegacyFaculties] = useState([]);
  const [selectedLegacyFaculty, setSelectedLegacyFaculty] = useState('');
  const [legacyDegrees, setLegacyDegrees] = useState([]);
  const [legacyError, setLegacyError] = useState(null);
  
  // Modern API state
  const [modernUniversities, setModernUniversities] = useState([]);
  const [selectedModernUniversity, setSelectedModernUniversity] = useState('');
  const [modernFaculties, setModernFaculties] = useState([]);
  const [selectedModernFaculty, setSelectedModernFaculty] = useState('');
  const [modernDegrees, setModernDegrees] = useState([]);
  const [modernError, setModernError] = useState(null);
  
  // Fetch provinces
  useEffect(() => {
    fetch('/api/provinces')
      .then(response => response.json())
      .then(data => setProvinces(data))
      .catch(error => console.error('Error fetching provinces:', error));
  }, []);
  
  // Fetch districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      fetch(`/api/districts?province=${encodeURIComponent(selectedProvince)}`)
        .then(response => response.json())
        .then(data => setDistricts(data))
        .catch(error => console.error('Error fetching districts:', error));
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);
  
  // Fetch legacy universities
  useEffect(() => {
    fetch('/api/universities')
      .then(response => response.json())
      .then(data => setLegacyUniversities(data))
      .catch(error => console.error('Error fetching legacy universities:', error));
  }, []);
  
  // Fetch modern universities
  useEffect(() => {
    fetch('/api/modern/universities')
      .then(response => response.json())
      .then(data => {
        setModernUniversities(data);
        setModernError(null);
      })
      .catch(error => {
        console.error('Error fetching modern universities:', error);
        setModernError("Failed to load universities using modern API. This might be due to inconsistencies in the data structure.");
      });
  }, []);
  
  // Fetch legacy faculties when university changes
  useEffect(() => {
    if (selectedLegacyUniversity) {
      setLegacyError(null);
      fetch(`/api/faculties?university=${encodeURIComponent(selectedLegacyUniversity)}`)
        .then(response => response.json())
        .then(data => {
          setLegacyFaculties(data);
          if (data.length === 0) {
            setLegacyError("No faculties found for this university.");
          }
        })
        .catch(error => {
          console.error('Error fetching legacy faculties:', error);
          setLegacyError("Failed to load faculties. This might be due to an error in the data structure");
        });
      setSelectedLegacyFaculty('');
      setLegacyDegrees([]);
    } else {
      setLegacyFaculties([]);
      setSelectedLegacyFaculty('');
      setLegacyDegrees([]);
    }
  }, [selectedLegacyUniversity]);
  
  // Fetch modern faculties when university changes
  useEffect(() => {
    if (selectedModernUniversity) {
      setModernError(null);
      fetch(`/api/modern/faculties?university=${encodeURIComponent(selectedModernUniversity)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setModernFaculties(data);
          if (data.length === 0) {
            setModernError("No faculties found for this university in the modern API data. This shows the data inconsistency between the legacy and modern APIs.");
          }
        })
        .catch(error => {
          console.error('Error fetching modern faculties:', error);
          setModernError("Failed to load faculties using modern API. This might be due to inconsistencies in the data structure.");
        });
      setSelectedModernFaculty('');
      setModernDegrees([]);
    } else {
      setModernFaculties([]);
      setSelectedModernFaculty('');
      setModernDegrees([]);
    }
  }, [selectedModernUniversity]);
  
  // Fetch legacy degrees when faculty changes
  useEffect(() => {
    if (selectedLegacyUniversity && selectedLegacyFaculty) {
      setLegacyError(null);
      fetch(`/api/degrees?university=${encodeURIComponent(selectedLegacyUniversity)}&faculty=${encodeURIComponent(selectedLegacyFaculty)}`)
        .then(response => response.json())
        .then(data => {
          setLegacyDegrees(data);
          if (data.length === 0) {
            setLegacyError("No degrees found for this faculty.");
          }
        })
        .catch(error => {
          console.error('Error fetching legacy degrees:', error);
          setLegacyError("Failed to load degrees. This might be due to an error in the data structure.");
        });
    } else {
      setLegacyDegrees([]);
    }
  }, [selectedLegacyUniversity, selectedLegacyFaculty]);
  
  // Fetch modern degrees when faculty changes
  useEffect(() => {
    if (selectedModernUniversity && selectedModernFaculty) {
      setModernError(null);
      fetch(`/api/modern/degrees?university=${encodeURIComponent(selectedModernUniversity)}&faculty=${encodeURIComponent(selectedModernFaculty)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setModernDegrees(data);
          if (data.length === 0) {
            setModernError("No degrees found for this faculty in the modern API data. This shows the data inconsistency between the legacy and modern APIs.");
          }
        })
        .catch(error => {
          console.error('Error fetching modern degrees:', error);
          setModernError("Failed to load degrees using modern API. This might be due to inconsistencies in the data structure.");
        });
    } else {
      setModernDegrees([]);
    }
  }, [selectedModernUniversity, selectedModernFaculty]);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Sri Lankan Data Demo</title>
        <meta name="description" content="Demo for Sri Lankan Universities, Faculties, and Degrees package" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Sri Lankan Data Demo
        </h1>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'provinces' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('provinces')}
          >
            Provinces & Districts
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'legacy' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('legacy')}
          >
            Universities - Legacy API
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'modern' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('modern')}
          >
            Universities - Modern API
          </button>
        </div>

        {/* Provinces & Districts Tab */}
        {activeTab === 'provinces' && (
          <div className={styles.tabContent}>
            <p>Using srilankan-provinces-districts@2.0.0-rc.1</p>

            <div className={styles.selectGroup}>
              <label htmlFor="province-select">Select Province:</label>
              <select
                id="province-select"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
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
              <>
                <h2>Districts in {selectedProvince}</h2>
                {districts.length > 0 ? (
                  <ul className={styles.grid}>
                    {districts.map((district) => (
                      <li key={district} className={styles.card}>
                        {district}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No districts found for this province.</p>
                )}
              </>
            )}
          </div>
        )}

        {/* Legacy API Tab */}
        {activeTab === 'legacy' && (
          <div className={styles.tabContent}>
            <p>Using @dinush/srilankan-universities-faculties-degrees@2.0.0-rc.7</p>
            <p><strong>Legacy API</strong> - using getUniversities(), getFaculties(), getDegrees()</p>

            <div className={styles.selectGroup}>
              <label htmlFor="legacy-university-select">Select University:</label>
              <select
                id="legacy-university-select"
                value={selectedLegacyUniversity}
                onChange={(e) => setSelectedLegacyUniversity(e.target.value)}
              >
                <option value="">Select a university</option>
                {legacyUniversities.map((university) => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </select>
            </div>

            {selectedLegacyUniversity && (
              <div className={styles.selectGroup}>
                <label htmlFor="legacy-faculty-select">Select Faculty:</label>
                <select
                  id="legacy-faculty-select"
                  value={selectedLegacyFaculty}
                  onChange={(e) => setSelectedLegacyFaculty(e.target.value)}
                  disabled={legacyFaculties.length === 0}
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

            {legacyError && (
              <div className={styles.error}>
                {legacyError}
              </div>
            )}

            {selectedLegacyUniversity && selectedLegacyFaculty && (
              <>
                <h2>Degrees in {selectedLegacyFaculty}</h2>
                {legacyDegrees.length > 0 ? (
                  <ul className={styles.list}>
                    {legacyDegrees.map((degree, index) => (
                      <li key={`legacy-${index}`} className={styles.item}>
                        {degree}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No degrees found for this faculty.</p>
                )}
              </>
            )}
          </div>
        )}

        {/* Modern API Tab */}
        {activeTab === 'modern' && (
          <div className={styles.tabContent}>
            <p>Using @dinush/srilankan-universities-faculties-degrees@2.0.0-rc.7</p>
            <p><strong>Modern API</strong> - using getAllUniversities(), getFacultiesByUniversity(), getDegreesByFaculty()</p>

            <div className={styles.selectGroup}>
              <label htmlFor="modern-university-select">Select University:</label>
              <select
                id="modern-university-select"
                value={selectedModernUniversity}
                onChange={(e) => setSelectedModernUniversity(e.target.value)}
              >
                <option value="">Select a university</option>
                {modernUniversities.map((university) => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </select>
            </div>

            {selectedModernUniversity && (
              <div className={styles.selectGroup}>
                <label htmlFor="modern-faculty-select">Select Faculty:</label>
                <select
                  id="modern-faculty-select"
                  value={selectedModernFaculty}
                  onChange={(e) => setSelectedModernFaculty(e.target.value)}
                  disabled={modernFaculties.length === 0}
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

            {modernError && (
              <div className={styles.error}>
                {modernError}
              </div>
            )}

            {selectedModernUniversity && selectedModernFaculty && (
              <>
                <h2>Degrees in {selectedModernFaculty}</h2>
                {modernDegrees.length > 0 ? (
                  <ul className={styles.list}>
                    {modernDegrees.map((degree, index) => (
                      <li key={`modern-${index}`} className={styles.item}>
                        {degree}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No degrees found for this faculty.</p>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}