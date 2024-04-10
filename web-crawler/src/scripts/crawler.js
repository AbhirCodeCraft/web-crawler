const urlRoutes = require('../modules/urlRoutes');
const crawlRoutes = require('../modules/crawlRoutes');
const writeEntry = require('../modules/writeEntry');

const createChunks = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};

const crawler = async (req, res, db) => {
    const url = 'https://www.companydetails.in/latest-registered-company-mca';
    try {
        let urls = await urlRoutes(url);
        const totalCount = urls.length;
        urls = createChunks(urls, 350);
        for (const chunk of urls) {
            const promises = chunk.map(url => crawlRoutes(url));
            let urlData = [];
            try {
                urlData = await Promise.all(promises);
                for (const data of urlData) {
                    if(data) await writeEntry(db, data);
                }
            } catch (error) {
                console.error('Error writing URLs to DB:', error);
            }
        }
        res.send(`Successfully crawled ${totalCount} pages`);
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).json({ success: false, error: 'Failed to crawl URL' });
    }
};

module.exports = crawler;
