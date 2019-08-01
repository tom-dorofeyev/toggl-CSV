const axios = require('axios');
const fs = require('fs');
const detailedReportUrl = 'https://toggl.com/reports/api/v2/details/'
const logger = require('../../services/logger.service')
const { Parser } = require('json2csv');

module.exports = {
    query
}

async function query(params, token) {
    try {
        const res = await axios.get(detailedReportUrl, {
            params,
            auth: { username: token, password: 'api_token' }
        })
        const data = res.data.data;
        const fields = Object.keys(data[0]);
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(data);
        fs.writeFile("data/res.csv", csv, function(err) {
            if(err) {
                return logger.error(err);
            }
            logger.info("The file was saved!");
        }); 
        return csv
    } catch (error) {
        logger.error('problems with query: ' + error)
        throw error
    }
}