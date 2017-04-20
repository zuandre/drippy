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


var destinations = "City of Cape Town|Oudtshoorn Municipality|Knysna Municipality|Bitou Municipality|Overstrand Municipality|Beaufort West Municipality|Kannaland Municipality|Hessequa Municipality|Breede Valley Municipality|Swartland Municipality|Matzikama Municipality|Laingsburg Municipality|Theeswaterskloof Municipality|Langeberg Municipality|George Municipality|Drakenstein Municipality|Saldanha Municipality|Prince Albert Municipality|Bergrivier Municipality|Mossel Bay Municipality|Stellenbosch Municipality|Swellendam Municipality|Witzenberg Municipality|Cape Agulhas Municipality|Cederberg Municipality";

exports.find = function (loc){

    var distance = req("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+loc+"&destinations="+destinations+"&key=AIzaSyCDYmGZqyojKaRvf249DdEQUSSycjgS15o",function (body){

      exports.dist = body;
});

}
