const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const router=require('./routes');
const fileup=require("express-fileupload");
const path=require('path');

const app=express();

app.use(bodyParser.json());
app.use(fileup());
//app.use(express.static('Attachment'));

app.use(express.static(__dirname + '/Attachment'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser());
app.use(cors());
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
app.use(passport.initialize());
app.use(passport.session());

// app.use(fileUpload());
// app.use('/attachment', express.static(path.join(__dirname,"./Attachment/")));

const GOOGLE_APP_ID = '208465501461-sl7d1ngr06ahehcml40bav3c95teg6gn.apps.googleusercontent.com';
const GOOGLE_APP_SECRET = '5fLIcZbtrvnYgmxRYYPaSken';

passport.serializeUser(function(user, done) {
    console.log("inside serializeUser");
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    console.log("inside serializeUser");
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: GOOGLE_APP_ID,
        clientSecret: GOOGLE_APP_SECRET,
        callbackURL: "http://localhost:3005/auth/google/callback"
    },function(token, refreshToken, profile, done){
    console.log(profile);
    return done(null,profile);

    }
));


app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'] }));

// the callback after google has authenticated the user
app.get('/auth/google/callback',

    passport.authenticate('google', {
        successRedirect : '/userlist',
        failureRedirect : '/'
    }));

app.get('/', function(req, res) {
    console.log("root");
    res.send('root'); // load the index.ejs file
});


// route for showing the profile page
app.get('/userlist', function(req, res) {

    console.log("root");
    res.send(profile);
});

router.route(app);


app.listen(3005,()=>{
    console.log('started server on port 3005')
});