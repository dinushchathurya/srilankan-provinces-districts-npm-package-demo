import { getDegrees } from "@dinush/srilankan-universities-faculties-degrees";

export default function handler(req, res) {
  const { university, faculty } = req.query;

  if (!university || !faculty) {
    return res
      .status(400)
      .json({ error: "University and faculty parameters are required" });
  }

  try {
    const degrees = getDegrees(university, faculty);
    res.status(200).json(degrees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
