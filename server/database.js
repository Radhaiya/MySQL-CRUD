const mysql = require('mysql2')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud'
});


//Testing if it is connected
db.query('SELECT * from testing', (error, results) => {
    if (error) {
        console.log(error);
    }

    else {
        console.log(results);
    }
})


module.exports = db;
