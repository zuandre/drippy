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


exports.find = function (loc,cb){

    var weather = req("https://api.darksky.net/forecast/d9d581cef08677dca58d6f9c0fe33436/"+loc+"?units=si",function (body){

      results = body.daily.data;
      var   resultsToday = body.hourly.summary;
      var today = body.currently.precipIntensity;



      //Today
      if (today == 0){
        var Todayfinal ={
            TodayPrecipType: resultsToday,
            TodayPercentage: 0
        }

      }
      else{
        var Todayfinal ={
          TodayPrecipType: body.currently.precipType,
          TodayPercentage: body.currently.precipProbability *100
        }
      }
      //yesterday
      if (results[0].precipIntensity == 0){
        var Yesterdayfinal ={
            YesterdayPrecipType: results[0].summary,
            TodayPercentage: 0
        }

      }
      else{
        var Yesterdayfinal ={
          YesterdayPrecipType: results[0].precipType,
          YesterdayPercentage: results[0].precipProbability *100
        }
      }
      //the rest of the week
      var dayLength = results.length;
      var TomorrowFinal = [];
      var count;
       for(var i =1; i < dayLength; i++){
        if(results[i].precipIntensity >0){
          count ++;
          TomorrowFinal.push({
            date: results[i].time,
            precipType: results[i].precipType,
            percentage: results[i].precipProbability *100
          });
        }
        else{
          TomorrowFinal.push({
            date: results[i].time,
            precipType: results[i].precipType,
            percentage: 0
          });

      }

      var final = {
          yesterday: Yesterdayfinal,
          today: Todayfinal,
          tomorrow: TomorrowFinal
      }
      cb(final);

    }
  });


}
