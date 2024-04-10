const updateClient = async (req, res, db) => {
    const { id } = req.params;
    const newData = req.body;

    if (!id) { return res.status(404).json({ success: false, error: 'Client ID is missing.' }); }

    const query = 'SELECT * FROM client_data WHERE id = ?';
    db.query(query, [id], async (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).json({ success: false, error: 'Failed to update client.' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ success: false, error: 'Record not found' });
            return;
        }
        const updateQuery = 'UPDATE client_data SET ? WHERE id = ?';
        await db.query(updateQuery, [newData, id], (err, data) => {
            if (err) {
                console.error('Error fetching data from database:', err);
                res.status(500).json({ success: false, error: err.sqlMessage || 'Failed to update client.' });
                return;
            }
            res.status(200).json({ success: true, message: `Client with ID ${id} updated successfully.` });
        });
    });
}
module.exports = updateClient;