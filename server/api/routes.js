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
const {
    Router
} = require('express');

const router = new Router();


const dbAndCacheConnectionChecker = require('../../server/services/connectionChecker/dbAndCacheConnectionChecker');

router.get('/listTables', dbAndCacheConnectionChecker.listTablesInDatabase);
router.get('/checkDbConnection', dbAndCacheConnectionChecker.checkDbConnections);
router.get('/checkCacheConnection', dbAndCacheConnectionChecker.setAndGetFromCache);
router.get('/checkRedisConnection',dbAndCacheConnectionChecker.checkRedisConnection);

module.exports = router;