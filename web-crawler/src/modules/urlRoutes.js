const axios = require('axios');
const cheerio = require('cheerio');

const fetchURLs = async (url) => {
    try {
        const originUrl = new URL(url).origin;
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const urls = [];

        $('a.fs-6.text-uppercase').each((index, element) => {
            const href = $(element).attr('href');
            if (href) urls.push(originUrl + href);
        });

        return urls.filter(url => !!url);
    } catch (error) {
        console.error('Error fetching URLs:', error);
        throw { success: false, error: 'Failed to fetch URLs' };
    }
};

module.exports = fetchURLs;
