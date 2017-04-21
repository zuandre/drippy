//Dam model
var request = require("request")


  function req(url, cb){
    //console.log(url);
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


var destinations = "-33.714889,20.5938|-33.9024,19.057|-33.7125,19.415833|-34.010306,20.553278|-32.0376,18.81972|-33.455485,21.636414|-33.3625,19.275278|-32.184722,18.866944|-33.789031,20.11234|empty|-34.127615,19.024587|-33.950278,19.283611|-33.901644,22.172269|-33.291667,20.985|-32.613056,22.005278|-32.613056,22.005278|-33.954445,22.514824|empty|empty|-33.666944,22.416944|-33.578889,19.705|-33.941667,19.789167|-34.053648,22.146747|empty|-33.771111,19.44|-33.366944,19.566944|empty|-33.028889,18.793333|-34.415455,19.179086|-33.247765,22.099056|-33.668056,20.0125|-33.858056,20.371111|-33.512071,20.751732|empty|empty|-34.18621,18.861444|-34.161099,18.921996|-33.833333,19.251389|-33.51349,22.59104|-34.078056,19.289167|-33.3375,19.033611|-33.833611,19.088889|-34.013611,22.216667";

exports.find = function (loc,cb){
    exports.dist="" ;
    var distance = req("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+loc+"&destinations="+destinations+"&key=AIzaSyDl9XcyzbhpgFOIVKxXKPmTKTQzDhutgsI",function (body){

      var results = body.rows[0].elements;

      var distance =[];
      var distval = [];

      for(var i=0; i< results.length; i++){
        distance[i] = results[i].distance;

        if(distance[i] != undefined){
          distval[i]=distance[i].value;
        }
        else{
          distval[i]=-1;
        }
      }
        cb(distval);
      });

    }
