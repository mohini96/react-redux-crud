let con = require('../../config/db');
const path = require("path");

// Add User
exports.addUser = (req, res) => {
    var params = {
        user_name: req.body.user_name,
        user_state: req.body.user_state,
        user_city: req.body.user_city,
        user_pincode: req.body.user_pincode,
        user_emailid: req.body.user_emailid,
        user_password: req.body.user_password,
        usertype_id: req.body.usertype_id,
        user_contactno: req.body.user_contactno,
    };
    con.query('INSERT INTO tbluser  SET ?', params, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        res.send(results);
    });
};

// Select all User
exports.getUser = (req, res) => {
    con.query('select * from tbluser', function (error, results) {
        if (error) {
            console.log(error);
        }
        res.send(JSON.stringify(results));
    });
};

// Delete User
exports.delUser = (req, res) => {
    var user_id = req.params.user_id;
    con.query('DELETE FROM `tbluser` WHERE `user_id`='+user_id, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        res.send('deleted');
    });
};
//select user by id
exports.getUserById = (req, res) => {
    var user_id = req.query.user_id;
    console.log('select update data ' + user_id);
    con.query('SELECT * FROM tbluser WHERE user_id =' + user_id, function (err, rows) {
        if (err)
            console.log("Error Selecting : %s ", err);
        res.send(rows);
       });

}

// Update User By ID
exports.updateUser = (req, res) => {

    var input = JSON.parse(JSON.stringify(req.body));
    var user_id = req.query.user_id;
    var params = {
        user_name: req.body.user_name,
        user_gender: req.body.user_gender,
        user_state: req.body.user_state,
        user_city: req.body.user_city,
        user_pincode: req.body.user_pincode,
        user_emailid: req.body.user_emailid,
        user_password: req.body.user_password,
        usertype_id: req.body.usertype_id,
        user_barcode: req.body.user_barcode,
        user_contactno: req.body.user_contactno,
        user_signupdate: req.body.user_signupdate
    };
    con.query("UPDATE tbluser set ? WHERE    user_id = ? ", [params, user_id], function (err, rows) {
        if (err)
            console.log("Error Updating  ", err);
        res.send('Updated successfully');
    });
};
 exports.loginUser = (req, res) => {
     var email = req.body.user_emailid;
     var password = req.body.user_password;
    var login = "select * from tbluser where user_emailid='" + email + "' and user_password='" + password + "'";
    con.query(login, (err, result) => {
        if (err) {
            res.send("incorrect");
        }
        if (result.length == 0) {
            res.send("incorrect");
        }
        else {
            res.send(result);
        }
    })
 };



