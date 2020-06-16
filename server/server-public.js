/**
 *
 * Copyright © 2020. Pumpjack Dataworks, Inc. All Rights Reserved.
 * This software and associated documentation files (the “Software”) is
 * proprietary to Pumpjack Dataworks, Inc.
 * All rights reserved. The methods and techniques described herein are considered trade secrets
 * and/or confidential. Reproduction or distribution, in whole or in part, is forbidden except by express written permission
 * of Pumpjack Dataworks, Inc.
 *
 * LICENSE RESTRICTIONS
 * Except as expressly permitted under the License, or unless you have received prior written authorization from Pumpjack Dataworks, Inc. you may not use, copy, modify, merge, publish, distribute, decompile, disclose, provide, create a derivative work of, or otherwise make available the Software.
 * Licenses may not be assigned, encumbered, sublicensed or transferred (whether directly or by operation of law) by the Licensee to any third party, and the Licensee will not grant any license, concession or other rights in or to any one or more of the Licenses to any third party.
 * See the file "LICENSE" for the full license governing this Software.
 * The above copyright notice and this license notice shall be included in all copies or substantial portions of the Software.
 */

const express = require('express');
const expressSanitizer = require('express-sanitizer');
const http = require('http');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const services = require('./api/routes');

const app = express();

app.disable('x-powered-by');

app.use(helmet({
    frameguard: {
        action: 'deny'
    }
}));

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'none'"],
        styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
    }
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(expressSanitizer());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-dsn');
    res.header('Content-Security-Policy', "frame-ancestors 'none';");
    next();
});

app.get('/', (req, res) => res.send({ 'server': 'public' }));

app.use('/api/services', services);

app.use((req, res, next) => {
    res.status(404).send({ status: 404, message: 'Sorry requested service was not found' });
});

const port = process.env.PORT || 3000;
const httpServer = http.createServer(app);
httpServer.listen(port);
httpServer.setTimeout(9000000);
console.info(`USL Server is listening on port -->>> ${port}`);

module.exports = httpServer;