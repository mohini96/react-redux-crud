let con=require('../../config/db');


// Add city
exports.addcity=(req,res)=>{
    var postdata=req.body;
    con.query('INSERT INTO tblcity SET ?',postdata, function (error, results) {
        if (error) {
            console.log(error);
        }
        res.send(JSON.stringify(results));
    });
};

// Select all city
exports.getcity=(req,res)=>{
    con.query('select * from tblcity', function (error, results) {
        if(error)
        {
            console.log(error);
        }
        res.send(JSON.stringify(results));
    });
};

// Delete city
exports.delcity=(req,res)=>{
    console.log(req.body);
    var city_id=req.query.city_id;
    con.query('DELETE FROM `tblcity` WHERE `city_id`=?',city_id, function (error, results, fields) {
        if (error){
            console.log(error);
        }
        res.send('Record has been deleted!');
    });
};
//select city by id
exports.getcityById=(req,res)=>{
    var city_id=req.query.city_id;
    console.log('select update data '+city_id);
    con.query('SELECT * FROM tblcity WHERE city_id ='+city_id,function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
    });

}
//select city by state
exports.getstateById=(req,res)=>{
    var state_id=req.query.state_id;
    con.query('SELECT * FROM tblcity,tblstate  WHERE tblstate.state_id=tblcity.state_id and tblcity.state_id ='+state_id,function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(JSON.stringify(rows));
    });

}

// Update city By ID
exports.updatecity=(req,res)=>{

    var input = JSON.parse(JSON.stringify(req.body));
    var city_id=req.query.city_id;
    con.query("UPDATE tblcity set ? WHERE city_id = ? ",[req.body,city_id], function(err, rows)
    {
        if (err)
            console.log("Error Updating  ",err );
        res.send('Updated successfully');
    });
};




