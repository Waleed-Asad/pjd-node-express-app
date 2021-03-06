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

const Config = require('../../config/serverConfig');
const ChainBreaker = require('../../utils/chainBreaker');
const { getJSON, setJSON } = require('../../services/db/cacheController');
const DBController = require('../../services/db/dbController');
var Redis = require('ioredis');


module.exports.checkDbConnections = function (req,res) {

    const responseObj = {
        success: true,
        message: ''
    };

const db = DBController.getDb();
db.connect().then(()=>{
     responseObj.message = 'Database Connected'
     res.send(responseObj);
}).catch( error =>{
    responseObj.message = 'Database not Connected'
    responseObj.success= false;
    res.send(responseObj);
})
}

module.exports.listTablesInDatabase = function (req,res) {
    const responseObj = {
        success: true,
        message: ''
    };

    const db = DBController.getDb();
    return db.any('SELECT table_name FROM information_schema.tables WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\';')
        .then((result) => {
            if (result) {
                responseObj.message = 'List of tables in db'
                responseObj.data = result;
                res.send(responseObj);
            }
        }).catch(err => {
            responseObj.message = 'Database not connected';
            responseObj.success = false;
            responseObj.data = err;
            res.send(responseObj);
        });
}

module.exports.setAndGetFromCache = function() {
    const responseObj = {
        success: true,
        message: ''
    };

    return setJSON(`key_test`, 'REDIS CONNECTED',Config.rediscachepath).then((result) => {
        if (result) {
            getJSON(`key_test`, 'CONNECTED', Config.rediscachepath);
            responseObj.message('Cache Connected');
            res.send(responseObj);
        }
        responseObj.message('Cache not Connected');
        responseObj.success= false;
        res.send(responseObj);
    });
}

module.exports.checkRedisConnection = function(req,res) {

    const responseObj = {
        success: true,
        message: ''
    };

    var client = new Redis({
            host: Config.rediscachepath,
            port: 6379,
          lazyConnect: true
        });

        client.connect().catch(function (e) {
            res.send('Redis not connected')
        });

    var result = client.ping()
        .then(function(e) {
            responseObj.message = 'Redis Connected!'
            res.send(responseObj);
        })

}