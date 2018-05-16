let con=require('../../config/db');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
let path=require('path');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
app.use(passport.initialize());
app.use(passport.session());
app.use(()=>{
    console.log("inside api");
})
exports.addUser=(req,res)=>{
    con.query('INSERT INTO user SET ?', req.body, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(error);
        }else{
            res.send({message:'Success',data:results});
        }
    });
};

// Select all user
exports.getUser=(req,res)=>{
    con.query('select * from user', function (error, results) {
        if(error)
        {
            console.log(error);
        }
        res.send(results);
    });
};


//select user by id
exports.getUserById = (req, res) => {
    var id = req.query.id;

    con.query('SELECT * FROM user WHERE id =' + id, function (err, rows) {
        if (err)
            console.log("Error Selecting : %s ", err);
        res.send(rows);
    });

}



// Delete User
exports.delUser = (req, res) => {
    var id = req.params.id;
    con.query('DELETE FROM `user` WHERE `id`='+id, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        res.send('deleted');
    });
};
//select user by id
exports.getUserById = (req, res) => {
    var id = req.params.id;
    con.query('SELECT * FROM user WHERE id =' + id, function (err, rows) {
        if (err)
            console.log("Error Selecting : %s ", err);
        res.send(rows);
    });

}

// Update User By ID
exports.updateUser = (req, res) => {
    let id = req.body.id;

    let params = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        id:req.body.id
    };
     console.log(params);
    con.query("UPDATE user set ? WHERE    id = ? ", [params, id], function (err, rows) {
        if (err)
            console.log("Error Updating  ", err);
        res.send({message:'Success',data:rows});
    });
};

exports.loginUser = (req, res) => {
    var name = req.body.name;
    var password = req.body.password;
    var login = "select * from user where name='" + name + "' and password='" + password + "'";
    con.query(login, (err, result) => {
        if (err) {
            res.send("incorrect");
        }
        if (result.length == 0) {
            res.send("incorrect");
        }
        else {
            console.log("result",result);
            res.send({message:'Success',data:result});
        }
    })
};

exports.image = (req, res) => {
    var f=req.files.file;
    var uploadpath=path.join("Attachment/"+f.name);
    f.mv(uploadpath);
    var params = {
        image: f.name,
    };
    con.query('INSERT INTO images SET ?', params, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        res.send({message:'Success',data:results});
    });
};
// Select all user
exports.getImage=(req,res)=>{
    con.query('select * from images', function (error, results) {
        if(error)
        {
            console.log(error);
        }
        res.send({message:'Success',data:results});
    });
};

// Select all ptoduct
exports.getProduct=(req,res)=>{
    con.query('select * from product', function (error, results) {
        if(error)
        {
            console.log(error);
        }
        console.log(results)
        res.send({message:'Success',data:results});
    });
};

exports.addProduct=(req,res)=>{
    con.query('INSERT INTO product SET ?', req.body, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(error);
        }else{
            console.log(results);
            res.send({message:'Success',data:results});
        }
    });
};

// Delete User
exports.delProduct = (req, res) => {
    console.log("inside del Product");
    var id = req.params.id;
    con.query('DELETE FROM `product` WHERE `id`='+id, function (error, results, fields) {
        if (error) {

            res.send(error);
        }
        else
        {
            res.send('deleted');
        }

    });
};

// //*****************************Authentication*******************************
//
// ps.serializeUser(function(user, done) {
//     done(null, user);
// });
//
// // used to deserialize the user
// ps.deserializeUser(function(id, done) {
//     con.query("select * from user where id = "+id, function(err, rows) {
//         done(err, rows);
//     });
// });
//
// ps.use('local',new LocalStrategy((username,password,done) =>{
//     console.log('start')
//     var sql = "SELECT * FROM user WHERE name='"+username+"' and password='"+password+"'";
//     //console.log(sql);
//     con.query(sql,function(err, rows) {
//         //console.log(err);
//         //console.log(rows);
//         if (err)
//             return done(err);
//         if (!rows.length) {
//             return done(null, false, {message: 'Wrong user'});
//         }
//         return done(null,rows);
//     });
// }));
//

//
// exports.passportLoginUser('/login',(req,res)=>{
//     console.log("invalid");
//     res.send({'matched':"invalid"});
// })
//
// exports.passportLoginUser('/login',ps.authenticate('local',{failureRedirect:res.send('fail to login')}),(req,res)=>{
//     console.log("data get");
//     res.send("success");
// });






