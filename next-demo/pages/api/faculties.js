import { getFaculties } from "@dinush/srilankan-universities-faculties-degrees";

export default function handler(req, res) {
  const { university } = req.query;

  if (!university) {
    return res.status(400).json({ error: "University parameter is required" });
  }

  try {
    const faculties = getFaculties(university);
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
