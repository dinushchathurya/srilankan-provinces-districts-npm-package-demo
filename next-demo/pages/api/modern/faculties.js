import { getFacultiesByUniversity } from "@dinush/srilankan-universities-faculties-degrees";

export default function handler(req, res) {
    const { university } = req.query;

    if (!university) {
        return res.status(400).json({ error: "University parameter is required" });
    }

    try {
        const facultiesData = getFacultiesByUniversity(university);
        const faculties = facultiesData.map(f => f.name);
        res.status(200).json(faculties);
    } catch (error) {
        res.status(500).json({ 
        error: error.message,
        note: "This may occur if the university doesn't exist in the modern API's data structure."
        });
    }
}