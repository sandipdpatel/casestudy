var mysql   = require("mysql");

function router(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

router.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Welcome to Performance Test case study!"});
    });

    router.get("/user",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["users"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.post("/login",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
        var table = ["users","email",req.body.email,"pwd",md5(req.body.password)];
        query = mysql.format(query,table);
		// console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", "User" : req.body.email});
            } else if (rows.length === 0) {
				res.json({"Error" : true, "Message" : "Invalid email or password", "User" : req.body.email});
			} else {
                res.json({"Error" : false, "Message" : "Success", "User" : req.body.email});
            }
        });
    });
	
	router.get("/login",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
        var table = ["users","email",req.query.eml,"pwd",md5(req.query.pwd)];
        query = mysql.format(query,table);
		// console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", "User" : req.body.email});
            } else if (rows.length === 0) {
				res.json({"Error" : true, "Message" : "Invalid email or password", "User" : req.body.email});
			} else {
                res.json({"Error" : false, "Message" : "Success", "User" : req.body.email});
            }
        });
    });

    router.post("/user",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["users","email","pwd",req.body.email,md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
				console.log(err);
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

    router.put("/user",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["users","pwd",md5(req.body.password),"email",req.body.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
				console.log(err);
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });
}

module.exports = router;
