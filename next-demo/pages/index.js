import { useState } from 'react';
import { getProvinces } from 'srilankan-provinces-districts';

export default function Home({ provinces }) {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState([]);
  
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
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Next.js Demo - Sri Lankan Provinces</h1>
      <p>Using srilankan-provinces-districts@2.0.0-rc.1 with server-side rendering</p>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="province-select" style={{ display: 'block', marginBottom: '5px' }}>
          Select Province:
        </label>
        <select 
          id="province-select"
          value={selectedProvince}
          onChange={handleProvinceChange}
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

// Server-side rendering
export async function getServerSideProps() {
  // Get provinces on the server
  const provinces = getProvinces();
  
  return {
    props: {
      provinces
    }
  };
} 