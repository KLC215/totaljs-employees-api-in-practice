var mysql = require('sqlagent/mysql')
    .connect({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employees'
    });

F.database = mysql;