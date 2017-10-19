
var http = require('http');
var parseString = require('xml2js').parseString;
var Car = require('./database/car');

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
          city: Number(input.city08[0]),
          comb: Number(input.comb08[0]),
          drive: input.drive[0],
          fueltype: input.fuelType[0],
          fueltype1: input.fuelType1[0],
          class: input.VClass[0]
        });
        console.log(car.save());
      })
    } catch (err){
      console.log("error");
      console.log(err);
    }
    
  });
}

var START_I = 9850;
var MAX_I = 50000;
function requestCar(i){
  console.log(i);
  options.path = "/ws/rest/vehicle/" + i;
  http.request(options, callback).end();
  setTimeout(function(){
    if(i < MAX_I){
      
      requestCar(i+1);
    }
  
    else{
      console.log("ALL Finished");  
      process.exit();
    }
      
  }, 200);
}

requestCar(START_I);


