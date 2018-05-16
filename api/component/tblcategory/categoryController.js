let con=require('../../config/db');


// Add category
exports.addcategory=(req,res)=>{

    con.query('INSERT INTO tblcategory SET ?', req.body, function (error, results, fields) {
        if (error) {
            console.log(error);
        }

        res.send(JSON.stringify(results));
    });
};

// Select all category
exports.getcategory=(req,res)=>{
    con.query('select * from tblcategory', function (error, results) {
        if(error)
        {
            console.log(error);
        }
        res.send(results);
    });
};

// Delete category
exports.delcategory=(req,res)=>{

    var category_id=req.params.category_id;
    con.query('DELETE FROM `tblcategory` WHERE `category_id`='+category_id, function (error, results, fields) {
        if (error){
            console.log(error);
        }
        res.send('deleted');
    });
};
//select category by id
exports.getcategoryById=(req,res)=>{
    var category_id=req.params.category_id;
    con.query('SELECT * FROM tblcategory WHERE category_id ='+category_id,function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
    });

}

// Update category By ID
exports.updatecategory=(req,res)=>{
    var cname=req.body.category_name;
    var category_id=req.params.category_id;
    var cquery="update tblcategory set category_name='"+cname+"' where category_id="+category_id;
    con.query(cquery,function(err, rows)
    {
        if (err)
            console.log("Error Updating  ",err );
        res.send('Updated successfully');
    });
};




