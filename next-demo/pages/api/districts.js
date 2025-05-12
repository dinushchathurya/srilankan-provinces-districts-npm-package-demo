import { getDistricts } from 'srilankan-provinces-districts';

export default function handler(req, res) {
  const { province } = req.query;
  
  if (!province) {
    return res.status(400).json({ error: 'Province parameter is required' });
  }
  
  try {
    const districts = getDistricts(province);
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 