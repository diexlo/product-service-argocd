const { Sequelize } = require('sequelize');
require('dotenv').config();
console.log('valores enviados de base diexlo ',{
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        connectTimeout: 20000
    },
    retry: {
        match: [
            /ECONNREFUSED/,
            /ETIMEDOUT/,
            /EHOSTUNREACH/,
            /ECONNRESET/,
            /EADDRINFO/
        ],
        max: 3
    }
});

// Add connection testing
sequelize.authenticate()
    .then(() => console.log('Database connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;