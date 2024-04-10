const cheerio = require('cheerio');
const axios = require('axios');

const crawlRoutes = async (url) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const extractedData = {};
        const basicDetailsElement = $('#basicdetails');

        basicDetailsElement.find('div').each((index, div) => {
            const $div = $(div);
            const firstDiv = $div.find('div').eq(0);
            const anchorText = firstDiv.find('a').text().trim();
            const h6Text = $div.find('div').eq(1).find('h6').text().trim();
            if (anchorText && h6Text && (anchorText!==anchorText+h6Text)) extractedData[anchorText.replace(/ /g,'_').toLowerCase()] = h6Text;
        });
        // CIN and PIN validation objective
        if (extractedData.cin.length !== 21 || extractedData.pin_code.length !== 6) return null;

        const improperData = extractedData[`state${extractedData.state.replace(/ /g,'_').toLowerCase()}`];
        if(improperData) delete extractedData[`state${extractedData.state.replace(/ /g,'_').toLowerCase()}`];
        return extractedData;
    } catch (error) {
        console.error('Error crawling URL:', error);
        throw { success: false, error: `Failed to crawl URL ${url}` };
    }
};

module.exports = crawlRoutes;
