let con=require('../../config/db');


// Add borrower
exports.addborrower=(req,res)=>{

    con.query('INSERT INTO tblborrower SET ?', req.body, function (error, results, fields) {
        if (error) {
            console.log(error);
        }

        res.send(JSON.stringify(results));
    });
};

// Select all borrower
exports.getborrower=(req,res)=>{
    con.query('select * from tblborrower', function (error, results) {
        if(error)
        {
            console.log(error);
        }
        res.send(JSON.stringify(results));
    });
};

// Delete borrower
exports.delborrower=(req,res)=>{
     borrower_id=req.query.borrower_id;
    con.query('DELETE FROM `tblborrower` WHERE `borrower_id`=?',borrower_id, function (error, results, fields) {
        if (error){
            console.log(error);
        }
        res.send('Record has been deleted!');
    });
};
//select borrower by id
exports.getborrowerById=(req,res)=>{
    var borrower_id=req.query.borrower_id;
    console.log('select update data '+borrower_id);
    con.query('SELECT * FROM tblborrower WHERE borrower_id ='+borrower_id,function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
        //console.log(rows);
        // res.send("sucecss",data:rows});

    });

}

// Update borrower By ID
exports.updateborrower=(req,res)=>{

    var input = JSON.parse(JSON.stringify(req.body));
    var borrower_id=req.query.borrower_id;

    con.query("UPDATE tblborrower set ? WHERE borrower_id = ? ",[req.body,borrower_id], function(err, rows)
    {
        if (err)
            console.log("Error Updating  ",err );
        res.send('Updated successfully');
    });
};




