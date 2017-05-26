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
exports.locate = function(cb){
req("https://data.code4sa.org/resource/ckmf-ksyn.json",function (body){
  //  console.log(body);
  var destination = body[0].municipality;
  for(var i=1; i < body.length; i++){
    destination = destination+' | '+body[i].municipality;
  }
  //console.log(destination)
    cb(body);

  });



}
