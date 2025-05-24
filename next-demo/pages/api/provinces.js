import { getProvinces } from 'srilankan-provinces-districts';

export default function handler(req, res) {
    try {
        const provinces = getProvinces();
        res.status(200).json(provinces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}