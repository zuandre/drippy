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
var locations = req("https://data.code4sa.org/resource/ckmf-ksyn.json",function (body){

    //console.log(body);
   exports.info= body;

});
