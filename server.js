// server.js

// BASE SETUP
// =============================================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var request = require("request");


// DAM --------models
var locations =require('./model/dams.js');
var damInfo = require('./model/damInfo.js');
var Locate = require('./model/locate.js');

//Municiple ---------models
var munInfo = require('./model/munInfo.js')
var munLocate = require('./model/munLocate.js')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

  // on routes that end in /dams
  // ----------------------------------------------------
  router.route('/dams')

  var loc = locations.dams;
// on routes that end in /dams/:user_location
// ----------------------------------------------------
router.route('/dams/:dam_location')
    // get distance from user_location (accessed at GET http://localhost:8080/api/dams/:dam_location)
    .get(function(req, res) {
       Locate.find(req.params.dam_location);
        var distval = Locate.dist; //distance value in meters from all dams to locations
        var dInfo = damInfo.info; // all dam info
        var final = [];
        for(var i=0; i < dInfo.length; i++){

          if(distval[i] != -1){

         var results = parseFloat(dInfo[i].this_week) - parseFloat(dInfo[i].last_week)

         final.push({
          name: dInfo[i].dam,
          fsc:   dInfo[i].fsc,
          last_week: dInfo[i].last_week,
          last_year: dInfo[i].last_year,
          river: dInfo[i].river,
          this_week: dInfo[i].this_week,
          distance: distval[i],
          result:results
       });
     }
   }

   final.sort(function(a,b){
       return a.distance - b.distance
 })
            res.json(final);
          //  res.json("lets",Locate.output);

    });


    // on routes that end in /Municiple
    // ----------------------------------------------------
    router.route('/municipality')

    var loc = locations.dams;
  // on routes that end in /municiple/:mun_location
  // ----------------------------------------------------
  router.route('/municipality/:mun_location')
      // get distance from user_location (accessed at GET http://localhost:8080/api/municiple/:mun_location)
      .get(function(req, res) {
        munLocate.find(req.params.mun_location);

        var body = munInfo.info;
        var final = [];
        var body2 = munLocate.dist;

        var results = body2.rows[0].elements;
        var distance =[];
        var distval = [];

        for(var i = 0; i < body.length; i++){
          distance[i] = results[i].distance;
          distval[i]=distance[i].value;

          final.push({
            municipality: body[i].municipality,
            restriction : body[i].restrictions,
            results: distval[i]
          });
        }

        final.sort(function(a,b){
          return a.result - b.result
        })

          res.json(final);
      });


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json(locations.dams);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
