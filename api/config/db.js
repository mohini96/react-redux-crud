const mysql=require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"dbborrowerinventory"
});

con.connect(function(err) {
    if (err){
        console.log(err);
    }
    console.log("Connected!");
});
module.exports=con;