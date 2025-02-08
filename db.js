const mysql = require('mysql2/promise');

module.exports.dataBase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'mysql_db_worker',
            user: 'myuser',
            password: 'mypassword',
            database: 'file_convert'
        });
        console.log("Connected to the database!");
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw new Error('Failed to connect to the database.');
    }
};