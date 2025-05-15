const express = require('express');
const provinces = require('srilankan-provinces-districts');
const universities = require('@dinush/srilankan-universities-faculties-degrees');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Node.js Demo - Sri Lanka Data API</h1>
    
    <h2>Provinces & Districts API</h2>
    <ul>
      <li><a href="/api/provinces">/api/provinces</a> - Get all provinces</li>
      <li><a href="/api/provinces/Western">/api/provinces/Western</a> - Get information about Western province</li>
      <li><a href="/api/provinces/Western/districts">/api/provinces/Western/districts</a> - Get districts in Western province</li>
    </ul>
    
    <h2>Universities, Faculties & Degrees API</h2>
    <ul>
      <li><a href="/api/universities">/api/universities</a> - Get all universities</li>
      <li><a href="/api/universities/University%20of%20Colombo">/api/universities/University of Colombo</a> - Get information about University of Colombo</li>
      <li><a href="/api/universities/University%20of%20Colombo/faculties">/api/universities/University of Colombo/faculties</a> - Get faculties in University of Colombo</li>
      <li><a href="/api/universities/University%20of%20Colombo/faculties/Faculty%20of%20Law/degrees">/api/universities/University of Colombo/faculties/Faculty of Law/degrees</a> - Get degrees in Faculty of Law</li>
    </ul>
  `);
});

// PROVINCES & DISTRICTS API ROUTES

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

// UNIVERSITIES, FACULTIES & DEGREES API ROUTES

// Get all universities
app.get('/api/universities', (req, res) => {
  res.json(universities.getUniversities());
});

// Get single university
app.get('/api/universities/:name', (req, res) => {
  try {
    // Try to use modern API first
    if (typeof universities.getUniversity === 'function') {
      const university = universities.getUniversity(req.params.name);
      if (university) {
        return res.json(university);
      }
    }
    
    // Fallback to checking if university exists in legacy API
    const allUniversities = universities.getUniversities();
    if (allUniversities.includes(req.params.name)) {
      return res.json({ name: req.params.name });
    }
    
    res.status(404).json({ error: 'University not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get faculties in a university
app.get('/api/universities/:name/faculties', (req, res) => {
  try {
    const faculties = universities.getFaculties(req.params.name);
    if (faculties && faculties.length > 0) {
      return res.json(faculties);
    }
    res.status(404).json({ error: 'University not found or has no faculties' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get degrees in a faculty
app.get('/api/universities/:uniName/faculties/:facName/degrees', (req, res) => {
  try {
    const degrees = universities.getDegrees(req.params.uniName, req.params.facName);
    if (degrees && degrees.length > 0) {
      return res.json(degrees);
    }
    res.status(404).json({ error: 'University or faculty not found or has no degrees' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Node.js demo running at http://localhost:${port}`);
});