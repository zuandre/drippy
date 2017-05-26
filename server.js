// server.js

// BASE SETUP
// =============================================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var request = require("request");


// DAM --------models
//var locations =require('./model/dams.js');
var damInfo = require('./model/damInfo.js');
var Locate = require('./model/locate.js');
var currentInfo,dInfo;


//Municiple ---------models
var munInfo = require('./model/munInfo.js');
var munLocate = require('./model/munLocate.js');
var munifo;


//Weather -------models
var weather = require('./model/weather.js');

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
  //  console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

  // on routes that end in /dams
  // ----------------------------------------------------
  router.route('/dams')
  .get(function(req, res) {

      damInfo.locations(function(info){
      var  currentInfo = info; //get the lastest dam info
        var dInfo = currentInfo; // all dam inf
        res.json(dInfo);

      });
    });
  //var loc = locations.dams;
// on routes that end in /dams/:user_location
// ----------------------------------------------------
router.route('/dams/:dam_location')
    // get distance from user_location (accessed at GET http://localhost:8080/api/dams/:dam_location)
    .get(function(req, res) {

        damInfo.locations(function(info){
        var  currentInfo = info; //get the lastest dam info
          var dInfo = currentInfo; // all dam info

          var final = [];

        Locate.find(req.params.dam_location,function(distance){
             var distval = distance; //distance value in meters from all dams to locations

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



        });






    });


    // on routes that end in /Municiple
    // ----------------------------------------------------
    router.route('/municipality')

    //var loc = locations.dams;
  // on routes that end in /municiple/:mun_location
  // ----------------------------------------------------
  router.route('/municipality/:mun_location')
      // get distance from user_location (accessed at GET http://localhost:8080/api/municiple/:mun_location)
      .get(function(req, res) {

        munInfo.locate(function(info){
          var  muninfo = info;
          //res.json(muninfo);
          var munfinal = [];
        //  console.log(muninfo);

          munLocate.find(req.params.mun_location,function(dist){
            var distval = dist;

            for(var i = 0; i < distval.length; i++){

              munfinal.push({
                municipality: muninfo[i].municipality,
                restriction : muninfo[i].restrictions,
                results: distval[i]
              });
            }
          //  console.log(munfinal);

            munfinal.sort(function(a,b){
              return a.results - b.results
            })

              res.json(munfinal);
          });

        });

      });



      // on routes that end in /weather
      // ----------------------------------------------------
      router.route('/weather')

      //var loc = locations.dams;
    // on routes that end in /weather/:location
    // ----------------------------------------------------
    router.route('/weather/:location')
        // get distance from user_location (accessed at GET http://localhost:8080/api/municiple/:mun_location)
        .get(function(req, res) {


            weather.find(req.params.location,function(dist){
              var distval = dist;


                res.json(distval);
            });
          });






// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  //  res.json(locations.dams);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
//console.log('Magic happens on port ' + port);
