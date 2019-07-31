const axios = require('axios');
const detailedReportUrl = 'https://toggl.com/reports/api/v2/details/'
const logger = require('../../services/logger.service')

module.exports = {
    query
}

async function query(params, token) {
    try {
        const res = await axios.get(detailedReportUrl, { 
            params,
            auth: { username: token, password: 'api_token' }
        })
        return res.data
    } catch (error) {
        logger.error('problems with query: ' + error)
        throw error
    }
}