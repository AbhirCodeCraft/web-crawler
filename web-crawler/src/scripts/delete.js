const deleteClient = async (req, res, db) => {
    const { id } = req.params;
    if (!id) { return res.status(404).json({ success: false, error: 'Client ID is missing.' }); }

    try {
        const deleteQuery = 'DELETE FROM client_data WHERE id = ?';
        await db.query(deleteQuery, [id]);

        res.status(200).json({ success: true, message: `Client with ID ${id} deleted successfully.` });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ success: false, error: 'Failed to delete client.' });
    }
}
module.exports = deleteClient;