import React, { useState, useEffect } from 'react';
import { getProvinces, getDistricts } from 'srilankan-provinces-districts';

// Check if modern API is available
let hasModernAPI = false;
try {
  const provinces = require('srilankan-provinces-districts');
  hasModernAPI = typeof provinces.getProvince === 'function';
} catch (e) {
  console.error('Error checking for modern API:', e);
}

function App() {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState([]);
  
  useEffect(() => {
    // Load provinces when component mounts
    setProvinces(getProvinces());
  }, []);
  
  useEffect(() => {
    // Load districts when province changes
    if (selectedProvince) {
      setDistricts(getDistricts(selectedProvince));
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>React Demo - Sri Lankan Provinces</h1>
      <p>Using srilankan-provinces-districts@2.0.0-rc.1</p>
      <p>Modern API available: {hasModernAPI ? 'Yes' : 'No'}</p>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="province-select" style={{ display: 'block', marginBottom: '5px' }}>
          Select Province:
        </label>
        <select 
          id="province-select"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
        >
          <option value="">Select a province</option>
          {provinces.map(province => (
            <option key={province} value={province}>{province}</option>
          ))}
        </select>
      </div>
      
      {selectedProvince && (
        <div>
          <h2>Districts in {selectedProvince}</h2>
          {districts.length > 0 ? (
            <ul style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '10px', 
              listStyle: 'none', 
              padding: 0 
            }}>
              {districts.map(district => (
                <li key={district} style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  padding: '10px',
                  backgroundColor: '#f9f9f9'
                }}>
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
  );
}

export default App;