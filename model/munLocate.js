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


var destinations = "Oudtshoorn Municipality | Knysna Municipality | Bitou Municipality | Overstrand Municipality | Beaufort West Municipality | Kannaland Municipality | Hessequa Municipality | Breede Valley Municipality | Swartland Municipality | Matzikama Municipality | Laingsburg Municipality | Theeswaterskloof Municipality | Langeberg Municipality | George Municipality | Drakenstein Municipality | Saldanha Municipality | Prince Albert Municipality | Bergrivier Municipality | Mossel Bay Municipality | Stellenbosch Municipality | Swellendam Municipality | Witzenberg Municipality | Cape Agulhas Municipality | Cederberg Municipality | City of Cape Town";

exports.find = function (loc,cb){

    var distance = req("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+loc+"&destinations="+destinations+"&key=AIzaSyDl9XcyzbhpgFOIVKxXKPmTKTQzDhutgsI",function (body){
    //  console.log("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+loc+"&destinations="+destinations+"&key=AIzaSyDl9XcyzbhpgFOIVKxXKPmTKTQzDhutgsI");
      //console.log(body);
      var results = body.rows[0].elements;
      var distance =[];
      var distval = [];

      for(var i = 0; i < results.length; i++){
        distance[i] = results[i].distance;
        distval[i]=distance[i].value;
      }

      cb(distval);
});

}
