const mysql = require('sqlagent/mysql')
    .connect({
        host: CONFIG('db-host'),
        user: CONFIG('db-username'),
        password: CONFIG('db-password'),
        database: CONFIG('db-database')
    });

F.database = mysql;