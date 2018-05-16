let con=require('../../config/db');


// Add manufacture
exports.addmanufacture=(req,res)=>{
    var postdata=req.body;
    con.query('INSERT INTO tblmanufacture SET ?',postdata, function (error, results) {
        if (error) {
            console.log(error);
        }
        res.send(JSON.stringify(results));
    });
};

// Select all manufacture
exports.getmanufacture=(req,res)=>{
    con.query('select * from tblmanufacture,tbluser where tbluser.user_id=tblmanufacture=user_id', function (error, results) {
        if(error)
        {
            console.log(error);
        }
        res.send(JSON.stringify(results));
    });
};

// Delete manufacture
exports.delmanufacture=(req,res)=>{
    var manufacture_id=req.query.manufacture_id;
    con.query('DELETE FROM `tblmanufacture` WHERE `manufacture_id`=?',manufacture_id, function (error, results, fields) {
        if (error){
            console.log(error);
        }
        res.send('Record has been deleted!');
    });
};
//select manufacture by id
exports.getmanufactureById=(req,res)=>{
    var manufacture_id=req.query.manufacture_id;
    console.log('select update data '+manufacture_id);
    con.query('SELECT * FROM tblmanufacture WHERE manufacture_id ='+manufacture_id,function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
    });

}
// Update manufacture By ID
exports.updatemanufacture=(req,res)=>{

    var input = JSON.parse(JSON.stringify(req.body));
    var manufacture_id=req.query.manufacture_id;
    console.log('update data');
    con.query("UPDATE tblmanufacture set ? WHERE manufacture_id = ? ",[req.body,manufacture_id], function(err, rows)
    {
        if (err)
            console.log("Error Updating  ",err );
        res.send('Updated successfully');
    });
};




