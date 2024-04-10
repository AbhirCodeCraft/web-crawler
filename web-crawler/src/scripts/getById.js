const getById = (req, res, db) => {
    const id = req.params.id;
    const query = 'SELECT * FROM client_data WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).json({ success: false, error: 'Failed to fetch data from database' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ success: false, error: 'Record not found' });
            return;
        }
        res.json({ success: true, data: results[0] });
    });
}
module.exports = getById;