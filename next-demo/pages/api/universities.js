import { getUniversities } from "@dinush/srilankan-universities-faculties-degrees";

export default function handler(req, res) {
    try {
        const universities = getUniversities();
        res.status(200).json(universities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}