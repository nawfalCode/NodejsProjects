/**
 * Module dependencies.
 */

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function (err, db) {
    if (err) {
        return console.dir(err);
    } else {
        console.log("We are connected");
    }

    var collection = db.collection('test');
    var doc1 = {
        'hello': 'doc1'
    };
    var doc2 = {
        'hello': 'doc2'
    };
    var lotsOfDocs = [{
        'hello': 'doc3'
    }, {
        'hello': 'doc4'
    }];
    var docs = [{
        mykey: 1,
        data: 20
    }, {
        mykey: 2,
        data: 21
    }, {
        mykey: 3,
        data: 22
    }];


    collection.insert(doc1);

    collection.insert(doc2, {
        w: 1
    }, function (err, result) {});

    collection.insert(lotsOfDocs, {
        w: 1
    }, function (err, result) {});
    collection.insert(docs);
     collection.find({
        mykey: 1
    }, function (err, item) {
        if (err) {
            console.log("we got an error :");
        } else {
            console.log(item.data);
        }
    });


});


var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path');

var app = express();
//app.configure
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});



app.engine('html', require('ejs').renderFile);

app.configure('development', function () {
    app.use(express.errorHandler());
});

/*
app.get('/', function(req,res){
    res.render('index.html',{title:'test'});
});
*/

app.get('/', routes.index);


app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});