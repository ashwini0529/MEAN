// server.js

// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('localhost:27017/node'); 

var Paper     = require('./app/models/papers');
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'API setup success!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

/*
Create a route to add paper details
*/

router.route('/paper/add')

.post(function(req, res) {
        
	var paper = new Paper();
	paper.subject = req.body.subject;
	paper.slot = req.body.slot;
	paper.courseCode = req.body.course_code;
	paper.school = req.body.school;

    //Time to save our paper into db
     paper.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Paper details saved!' });
        });
 })

.get(function(req,res){
	Paper.find(function(err,papers){
		if(err)
			res.send(err);

		res.json(papers);
	});
});

app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('API running on port ' + port);