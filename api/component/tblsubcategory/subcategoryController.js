let con=require('../../config/db');


// Add subcategory
exports.addsubcategory=(req,res)=>{
    con.query('INSERT INTO tblsubcategory SET ?', req.body, function (error, results, fields) {
        if (error) {
            console.log(error);
        }

        res.send(JSON.stringify(results));
    });
};

// Select all subcategory
exports.getsubcategory=(req,res)=>{
    con.query('select * from tblsubcategory', function (error, results) {
        if(error)
        {
            console.log(error);
        }
        res.send(JSON.stringify(results));
    });
};

// Delete subcategory
exports.delsubcategory=(req,res)=>{

    var subcategory_id=req.params.subcategory_id;
    con.query('DELETE FROM `tblsubcategory` WHERE `subcategory_id`='+subcategory_id, function (error, results, fields) {
        if (error){
            console.log(error);
        }
        res.send('deleted');
    });
};
//select subcategory by id
exports.getsubcategoryById=(req,res)=>{
    var subcategory_id=req.params.subcategory_id;

    con.query('SELECT * FROM tblsubcategory WHERE subcategory_id ='+subcategory_id,function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);

    });

}
// add addsubcategory By ID
exports.addsubcategoryById=(req,res)=>{
    var category_id=req.query.category_id;
    con.query('INSERT INTO tblsubcategory,tblcategory SET ? where tblsubcategory.category_id=tblcategory.category_id and tblsubcategory.category_id ='+category_id, req.body, function (error, results, fields) {
        if (error) {
            console.log(error);
        }

        res.send(JSON.stringify(results));
    });

}
// Update subcategory By ID
exports.updatesubcategory=(req,res)=>{

    var cname=req.body.subcategory_name;
    var category_id=req.body.category_id;
    var subcategory_id=req.params.subcategory_id;
    var cquery="update tblsubcategory set category_name='"+cname+"' category_id='"+category_id+"' where subcategory_id="+subcategory_id;

    con.query(cquery,function(err, rows)
    {
        if (err)
            console.log("Error Updating  ",err );
        res.send('Updated successfully');
    });
};

//select subcategory by category
exports.getcategoryById=(req,res)=>{

    var category_id=req.query.category_id;
    console.log(category_id);
    con.query('SELECT * FROM tblcategory,tblsubcategory  WHERE tblcategory.category_id=tblsubcategory.category_id and tblsubcategory.category_id ='+category_id,function(err,rows)
    {

        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
    });

}
//
// //select subcategory by category
// exports.getcategoryById=(req,res)=>{
//
//     con.query('SELECT * FROM tblcategory,tblsubcategory  WHERE tblcategory.category_id=tblsubcategory.category_id Group by tblcategory.category_id',function(err,rows)
//     {
//
//         if(err)
//             console.log("Error Selecting : %s ",err );
//         res.send(rows);
//     });
//
// }





