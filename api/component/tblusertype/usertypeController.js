let con=require('../../config/db');


// Add usertype
exports.addusertype=(req,res)=>{

    con.query('INSERT INTO tblusertype SET ?', req.body, function (error, results, fields) {
        if (error) {
            console.log(error);
        }

        res.send(JSON.stringify(results));
    });
};

// Select all usertype
exports.getusertype=(req,res)=>{
    con.query('select * from tblusertype', function (error, results) {
        if(error)
        {
            console.log(error);
        }
        res.send(results);
    });
};

// Delete usertype
exports.delusertype=(req,res)=>{
    var usertype_id=req.query.usertype_id;
    con.query('DELETE FROM `tblusertype` WHERE `usertype_id`=?',usertype_id, function (error, results, fields) {
        if (error){
            console.log(error);
        }
        res.end('Record has been deleted!');
    });
};
//select usertype by id
exports.getusertypeById=(req,res)=>{
    var usertype_id=req.query.usertype_id;
    con.query('SELECT * FROM tblusertype WHERE usertype_id ='+usertype_id,function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
        //console.log(rows);
        // res.send("sucecss",data:rows});

    });

}

// Update usertype By ID
exports.updateusertype=(req,res)=>{

    var input = JSON.parse(JSON.stringify(req.body));
    var usertype_id=req.query.usertype_id;

    con.query("UPDATE tblusertype set ? WHERE usertype_id = ? ",[req.body,usertype_id], function(err, rows)
    {
        if (err)
            console.log("Error Updating  ",err );
        res.send('Updated successfully');
    });
};




