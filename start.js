var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./apps/rest.js");
var app  = express();
var env  = process.env;

function rest(){
    var self = this;
    self.connectMysql();
};

rest.prototype.connectMysql = function() {
    var self = this;
}

rest.prototype.configureExpress = function(connection) {
}

rest.prototype.startServer = function() {
}

rest.prototype.stop = function(err) {
}

new rest();
