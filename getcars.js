var http = require('http');
var mongoose = require('mongoose');
var parseString = require('xml2js').parseString;

mongoose.connect('mongodb://localhost:27017/test');
var Schema = mongoose.Schema;
var carSchema = new Schema({
  id: { type : String , unique : true, required : true},
  year: Number,
  make: String,
  model: String,
  trans: String,
  hwy: Number,
  city: Number
});

var Car = mongoose.model('Car', carSchema);



var options = {
  host: 'www.fueleconomy.gov',
  path: '/ws/rest/vehicle/1',
  method: 'GET'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    try{
      parseString(str, function(err, result){
        //console.log(result);
        console.log(result.vehicle);
        var input = result.vehicle;
        var car = new Car({
          id: input.id[0],
          year: Number(input.year[0]),
          make: input.make[0],
          model: input.model[0],
          trans: input.trany[0],
          hwy: Number(input.highway08[0]),
          city: Number(input.city08[0])
        });
        console.log(car.save());
      })
    } catch (err){
      console.log("error");
      console.log(err);
    }
    
  });
}

var START_I = 20000;
var MAX_I = 20001;
function requestCar(i){
  console.log(i);
  options.path = "/ws/rest/vehicle/" + i;
  http.request(options, callback).end();
  setTimeout(function(){
    if(i < MAX_I){
      
      requestCar(i+1);
    }
  
    else
      console.log("ALL Finished");  
  }, 200);
}

requestCar(START_I);
