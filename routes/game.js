var express = require('express');
const mongojs = require("mongojs");
var router = express.Router();
var db = mongojs('footballdata', ['players']);
var ObjectId = mongojs.ObjectId;





module.exports = router;
