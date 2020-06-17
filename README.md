# pjd-node-express-app
**Node JS Express server**

--------------------------------------
**Command to run server**: npm run start-server

**Environment Variables for Express Server:**
 
 - DB_HOST
 - DB_NAME
 - DB_PASSWORD
 - DB_USER_NAME
 - REDIS_CACHE_PATH
 

---------------------------------------
**API's:**

**Check db connection through this route**: /api/services/checkDbConnection

**Expected Result:** 

{
    "success": true,
    "message": "Database Connected"
}

**List tables from Database**: /api/services/listTables 

**Expected Result:**

{
    "success": true,
    "message": "List of tables in db",
    "data": [
        {
            "table_name": "city"
        },
        {
            "table_name": "country"
        },
        {
            "table_name": "countrylanguage"
        }
    ]
}


**Check Redis connection through this route**: /api/services/checkRedisConnection

**Expected Result:**

{
    "success": true,
    "message": "Redis Connected!"
}

---------------------------------------
**SQL sample dump** is located in 'sql_dump' folder

