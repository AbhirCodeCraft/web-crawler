const getAll = (req, res, db) => {
    let whereClause = '';

    const { id, name, cin, email } = req.query
    switch (true) {
        case !!id:
            whereClause = `WHERE id = ${db.escape(id)}`;
            break;
        case !!name:
            whereClause = `WHERE company_name = ${db.escape(name)}`;
            break;
        case !!cin:
            whereClause = `WHERE cin = ${db.escape(cin)}`;
            break;
        case !!email:
            whereClause = `WHERE email = ${db.escape(email)}`;
            break;
        default:
            break;
    }
    const query = `SELECT * FROM client_data ${whereClause} ORDER BY id DESC`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).json({ success: false, error: 'Failed to fetch data from database' });
            return;
        }
        res.json({ count: results.length, clientData: results });
    });
}

module.exports = getAll;