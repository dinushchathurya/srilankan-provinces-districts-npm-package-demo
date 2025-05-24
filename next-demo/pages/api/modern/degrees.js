import { getDegreesByFaculty } from "@dinush/srilankan-universities-faculties-degrees";

export default function handler(req, res) {
    const { university, faculty } = req.query;

    if (!university || !faculty) {
        return res
        .status(400)
        .json({ error: "University and faculty parameters are required" });
    }

    try {
        const degreesData = getDegreesByFaculty(university, faculty);
        const degrees = degreesData.map(d => d.name);
        res.status(200).json(degrees);
    } catch (error) {
        res.status(500).json({ 
        error: error.message,
        note: "This may occur if the faculty or university doesn't exist in the modern API's data structure."
        });
    }
}