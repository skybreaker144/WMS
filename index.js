var express = require('express');
var bodyParser = require("body-parser");
var mysql = require("mysql");
var session = require("express-session");
var path = require("path");
var methodOverride = require("method-override");
var flash = require("connect-flash");
const { request } = require('http');
const { response } = require('express');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'waste_management_system'
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected");
    }
});

var app = express();

app.use(session({
    secret: 'This is mayday',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());

app.use(function (req, res, next) {
    // res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                if (results[0].usertype == "Admin") {
                    response.redirect('/admin');
                }
                else {
                    response.redirect('/user')
                }

            } else {
                request.flash("error", "Incorrect UserId and/or Password!")
                response.redirect("/");
            }
            response.end();
        });
    } else {
        request.flash("error", "Please Login to view this page!");
        response.redirect("/");
    }
});

app.post('/reg', function (req, res) {
    connection.query('SELECT * FROM login WHERE username = ?', [req.body.username], function (error, results, fields) {
        //req.flash("hey")
        if (error) {
            console.log(error);
        }
        else if (results.length > 0) {
            req.flash("error", "This User already Exist!");
            res.redirect("/");
        }
        else {
            var newLogin = "insert into login(username, password, usertype, Phone_Num_1, Phone_Num_2, Email_ID, Location, FirstName, LastName, City, Image, DOB) values(?,?,?,?,?,?,?,?,?,?,?,?)";
            var loginvalue = [req.body.uname, req.body.password, req.body.utype,req.body.phn1,req.body.phn2,req.body.email,req.body.location,req.body.fname,req.body.lname,req.body.city,req.body.img,req.body.DOB];
            connection.query(newLogin, loginvalue, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    res.redirect('/');
                } else {
                    req.flash("success", "User registered sucessfully");
                    res.redirect('/');
                }
            });
        }
    });

});

app.post('/user/regComp', function (req, res) {
    connection.query('SELECT * FROM regcomp', function (error, results, fields) {
        //req.flash("hey")
        if (error) {
            console.log(error);
        }
        else if (results.length > 0) {
            req.flash("error", "This Complaint already Exist!");
            res.redirect("/user/regComp");
        }
        else {
            var newLogin = "insert into regcomp(username, location, description, Type_waste, Image, City, Date, Street, rec_team_size) values(?,?,?,?,?,?,?,?,?)";
            var loginvalue = [req.session.username, req.body.Location,req.body.Desc, req.body.wtype, req.body.img, req.body.city, req.body.date, req.body.street, req.body.rts];
            connection.query(newLogin, loginvalue, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    res.redirect('/user/regComp');
                } else {
                    req.flash("success", "User registered sucessfully");
                    res.redirect('/user');
                }
            });
        }
    });

});

app.get('/admin', function (request, response) {
    if (request.session.loggedin) {
        // response.send('Welcome to admin home page, ' + request.session.username + '!');
        response.render("admin.ejs");
    } else {
        request.flash("error", "Please Login to view this page!");
        response.redirect("/");
    }
});

app.get('/user', function (request, response) {
    if (request.session.loggedin) {
        //response.send('Welcome to adminHomePage/salesReportagent home page, ' + request.session.username + '!');
        // response.sendFile(path.join(__dirname + '/views/agentHomepage1.ejs'));
        response.render("user.ejs")
    } else {
        request.flash("error", "Please Login to view this page!");
        response.redirect("/");
    }
});

app.get('/register',function(request,response){
        response.render("register.ejs")
});

app.get("/user/Myprof", function (req, res) {
    if (req.session.loggedin) {
        str = "select * from login where login.username = '" + req.session.username + "'"
        connection.query(str, function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(results);
                res.render("Myprof.ejs", { details: results });
            }
        })
    } else {
        req.flash("error", "Please Login to view this page!");
        res.redirect("/");
    }
})

app.get("/user/viewComp", function (req, res) {
    if (req.session.loggedin) {
        str = "select * from regcomp where regcomp.username = '" + req.session.username + "'"
        connection.query(str, function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(results);
                res.render("viewComp.ejs", { details: results });
            }
        })
    } else {
        req.flash("error", "Please Login to view this page!");
        res.redirect("/");
    }
})

app.get('/user/regComp',function(request,response){
    response.render('regComp.ejs')
});

app.get('/user/remComp',function(request,response){
    response.render('remComp.ejs')
});

app.get('/user/viewComp',function(request,response){
    response.render('viewComp.ejs')
});

var server = app.listen(3000, function () {
    console.log('Server is running on localhost:3000');
});