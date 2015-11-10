//Database
var db = require('mongoose');
//Database Connection String
db.connect(process.env.DB_URI);
//Database Schema Like Create Script

//This is what gets returned
module.exports = db;
