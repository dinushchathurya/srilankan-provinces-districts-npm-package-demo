const express = require('express');
const provinces = require('srilankan-provinces-districts');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Node.js Demo - Sri Lanka Provinces API</h1>
    <p>Try the following endpoints:</p>
    <ul>
      <li><a href="/api/provinces">/api/provinces</a> - Get all provinces</li>
      <li><a href="/api/provinces/Western">/api/provinces/Western</a> - Get information about Western province</li>
      <li><a href="/api/provinces/Western/districts">/api/provinces/Western/districts</a> - Get districts in Western province</li>
    </ul>
  `);
});

// Get all provinces
app.get('/api/provinces', (req, res) => {
  res.json(provinces.getProvinces());
});

// Get single province
app.get('/api/provinces/:name', (req, res) => {
  try {
    // Try to use modern API first
    if (typeof provinces.getProvince === 'function') {
      const province = provinces.getProvince(req.params.name);
      if (province) {
        return res.json(province);
      }
    }
    
    // Fallback to checking if province exists in legacy API
    const allProvinces = provinces.getProvinces();
    if (allProvinces.includes(req.params.name)) {
      return res.json({ name: req.params.name });
    }
    
    res.status(404).json({ error: 'Province not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get districts in a province
app.get('/api/provinces/:name/districts', (req, res) => {
  try {
    const districts = provinces.getDistricts(req.params.name);
    if (districts && districts.length > 0) {
      return res.json(districts);
    }
    res.status(404).json({ error: 'Province not found or has no districts' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Node.js demo running at http://localhost:${port}`);
});