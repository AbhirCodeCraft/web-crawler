const writeEntry = require("../modules/writeEntry");

const addClient = async (req, res, db) => {
    const { company_name } = req.body;

    if (!company_name) { return res.status(400).json({ success: false, error: 'Company name is required.' }); }

    try {
        await writeEntry(db, req.body)
        res.status(200).json({ success: true, message: `Client added successfully.` });
    } catch (error) {
        console.error('Error while adding client:', error);
        res.status(500).json({ success: false, error: 'Failed to add client.' });
    }
}
module.exports = addClient;