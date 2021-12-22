const express = require('express');
const app = express();
var mongoose = require('mongoose');
// set our port
const port = 3000;
// configuration ===========================================

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
// set up BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// config files
var db = require('./config/db');
console.log("connecting--",db);
mongoose.connect(db.url); //Mongoose connection created

// frontend routes =========================================================
app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

//defining route
app.get('/route', function (req, res) {
   res.send('This is routing for the application developed using Node and Express...');
});


var Student = require('./app/models/students');
app.get('/api/students', function(req, res) {
   Student.find(function(err, students) {
      if (err)
         res.send(err);
      res.json(students); 
   });
});

app.post('/api/students/add', function (req, res) {
        var student = new Student(); // create a new instance of the student model
        student.name = req.body.name; // set the student name (comes from the request)
        student.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'student created!' });

    });
});
app.delete('/api/students/:id', function (req, res) {
    Student.remove({
    _id: req.params.id
    }, function(err, bear) {
    if (err)
    res.send(err);
    res.json({ message: 'Successfully deleted' });
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
