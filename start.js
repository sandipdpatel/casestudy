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
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
		port	 : process.env.OPENSHIFT_MYSQL_DB_PORT,
        user     : 'admin2cPSTM8',
        password : 'SdUxGSv6Y4yq',
        database : 'restful',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

rest.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

rest.prototype.startServer = function() {
      app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost',function(){
          console.log("All right ! I am alive at Port 3000.");
      });
}

rest.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new rest();
