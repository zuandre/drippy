//Dam model
var request = require("request")


  function req(url, cb){

    //var url = url;
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
        //return body // Print the json response
      cb(body);
        }

      });
  }


// gettting all locations
var locations = req("https://dam-levels.firebaseio.com/location.json",function (body){

  var destinations = [];
  var count = 0;

  for(i in body){
          destinations[count] = body[i].Location;
          count++;
      }

  var destination = destinations[0];
      for(var i = 1; i < destinations.length; i++){
        if(destinations[i] != ""){
          destination = destination +"|" +destinations[i];
        }
        else{
          destination = destination +"|empty";
        }
      }

    exports.dams= destination

});


//exports.dams = locations;
