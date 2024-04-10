const writeEntry = async (db, data) => {
    const insertQuery = `
    INSERT INTO client_data (
        company_name, company_activity, cin, registration_date, category, sub_category, company_class, roc, company_status, authorised_capital, paidup_capital, state, pin_code, country, address, email
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.company_name,
        data.company_activity || null,
        data.cin || null,
        data.registration_date || null,
        data.category || null,
        data.sub_category || null,
        data.company_class || null,
        data.roc || null,
        data.company_status || null,
        data.authorised_capital || null,
        data.paidup_capital || null,
        data.state || null,
        data.pin_code || null,
        data.country || null,
        data.address || null,
        data.email || null
    ];
    
    await db.query(insertQuery, values);
}

module.exports = writeEntry;