let con=require('../../config/db');
let path=require('path');
var csv = require('fast-csv');
var fs=require('fs');
// var session=require('express-session');
// var flash=require('connect-flash');
//var csvfile=__dirname+"/../files/importProduct.csv";
//var stream =fs.createReadStream(csvfile);

// Add product
exports.addproduct=(req,res)=>{
    var f=req.files.sample;
    var uploadpath=path.join("Attachment/"+f.name);
    f.mv(uploadpath);
    var params = {
        product_name: req.body.product_name,
        regular_price: req.body.regular_price,
        sale_price: req.body.sale_price,
        category_id: req.body.category_id,
        subCategory_id: req.body.subCategory_id,
        product_image: f.name,
        description: req.body.description,
        status: req.body.status,
        barcode: req.body.barcode,
        upload_date_time: req.body.upload_date_time,
        manufacture_id: req.body.manufacture_id,
        flag: req.body.flag,
    };
    con.query('INSERT INTO tblproduct SET ?', params, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        res.status(200).send('inserted');
    });
};

// Select all product
exports.getproduct=(req,res)=>{
    con.query('select * from tblproduct', function (error, results) {
        if(error)
        {
            console.log(error);
        }
        res.send(results);
    });
};

// Delete product
exports.delproduct=(req,res)=>{
    var product_id=req.params.product_id;
    console.log(product_id)
    con.query('DELETE FROM `tblproduct` WHERE `product_id`=?',product_id, function (error, results, fields) {
        if (error){
            console.log(error);
        }
        res.send('deleted');
    });
};
//select product by id
exports.getproductById=(req,res)=>{
    var product_id=req.query.product_id;
    console.log('select update data '+product_id);
    con.query('SELECT * FROM tblproduct WHERE product_id ='+product_id,function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
    });

}

// Update product By ID
exports.updateproduct=(req,res)=>{

    var input = JSON.parse(JSON.stringify(req.body));
    var product_id=req.query.product_id;
    console.log('update data');
    con.query("UPDATE tblproduct set ? WHERE product_id = ? ",[req.body,product_id], function(err, rows)
    {
        if (err)
            console.log("Error Updating  ",err );
        res.send('Updated successfully');
    });
};
// Update File
exports.importProduct=(req,res)=>{

    if(req.files.product==undefined)
        return res.status(500).send('file not found');
    var f=req.files.product;
    var file=f.name;
    var ext=path.extname(file);
    var uploadpath="";

    var filename="productlist-"+Date.now()+ext;
    console.log("file:"+filename);
    if(ext==".csv"){
        uploadpath=path.join("Attachment/"+filename);
        var fileuploaded = f.mv(uploadpath);
        console.log(uploadpath);
    }
    if(fileuploaded){
        var stream =fs.createReadStream(uploadpath);
        fs.createReadStream(uploadpath)
            .pipe(csv())
            .on("data", function(data){

                if(temp_flag == 0){
                    temp_flag = 1;
                }else{

                    var product_name = data[0];
                    var regular_price = data[1];
                    var sale_price = data[2];
                    var category_id = data[3];
                    var subCategory_id = data[4];
                    var product_image = data[5];
                    var description = data[6];
                    var status = data[7];
                    var barcode = data[8];
                    var upload_date_time = data[9];
                    var manufacture_id = data[10];
                    var flag = data[11];


                    con.query("INSERT INTO tblproduct(product_name,regular_price,sale_price,category_id,subCategory_id,product_image,description,status,barcode,upload_date_time,manufacture_id,flag)values(" + product_name + ",'" + regular_price + "'," + sale_price + "," + category_id + "," + subCategory_id + "," + product_image + "," + description + "," + status + "," + barcode + "," + upload_date_time + "," + manufacture_id + "," + flag + ")", (error, results, fields) => {
                        if (error) throw error;
                        else console.log("insert store");
                    });
                }
            })
            .on("end", function(){
                console.log(" End of file import");
            });
        return res.json({success : "Data imported successfully."});

        res.send("New project added successfully into system...!");
    }
    else {
        res.send("uploading error");
    }
};

