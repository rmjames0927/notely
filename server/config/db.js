//Database
var db = require('mongoose');
//Database Connection String
db.connect('mongodb://mongo:newpass#1@ds031912.mongolab.com:31912/notelydb');
//Database Schema Like Create Script

//This is what gets returned
module.exports = db;
