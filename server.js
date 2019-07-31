const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const http = require('http').createServer(app);
const logger = require('./services/logger.service')

app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://127.0.0.1:8080',
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
const reportRoute = require('./api/report/report.routes');

app.use('/api/report', reportRoute);

const port = process.env.PORT || 3000;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});
