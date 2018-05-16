let con=require('../../config/db');


// Add State
exports.addstate=(req,res)=>{

    var params  = {
        state_name:req.body.state_name,
    };

    con.query('INSERT INTO tblstate SET ?', req.body, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        res.send(JSON.stringify(results));
    });
};

// Select all State
exports.getstate=(req,res)=>{
    con.query('select * from tblstate', function (error, results) {
        if(error)
        {
            console.log(error);
        }
        res.send(JSON.stringify(results));
    });
};

// Delete state
exports.delstate=(req,res)=>{
    console.log(req.body);
    var state_id=req.query.state_id;
    con.query('DELETE FROM `tblstate` WHERE `state_id`=?',state_id, function (error, results, fields) {
        if (error){
            console.log(error);
        }
        res.send('Record has been deleted!');
    });
};
//select state by id
exports.getstateById=(req,res)=>{
    var state_id=req.query.state_id;
    con.query('SELECT * FROM tblstate WHERE state_id ='+state_id,function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
        //console.log(rows);
        // res.send("sucecss",data:rows});

    });

}

// Update User By ID
exports.updatestate=(req,res)=>{

    var input = JSON.parse(JSON.stringify(req.body));
    var state_id=req.query.state_id;
    var params  = {
        state_name:req.body.state_name,
    };
    con.query("UPDATE tblstate set ? WHERE state_id = ? ",[params,state_id], function(err, rows)
    {
        if (err)
            console.log("Error Updating  ",err );
        res.send('Updated successfully');
    });
};




