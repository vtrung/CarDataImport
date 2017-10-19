//var mongoose = require('mongoose');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});
//console.log(mongoose);
//mongoose.connect('mongodb://localhost:27017/test');
//mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
// var uri = "mongodb://localhost/test";
// var db = mongoose.createConnection(uri);

// console.log(db);

// db.close();

//var connection = mongoose.createConnection('mongodb://localhost:27017/test');
// var Schema = mongoose.Schema;
// var carSchema = new Schema({
//   id: { type : String , unique : true, required : true},
//   year: Number
// });

// var Car = mongoose.model('Car', carSchema);

// var car = new Car({
//     id: '102991',
//     year: 11
//   });

//   car.save(function(err, suc){
//     if (err) return console.error(err);
//     console.log(suc);
//   });

//process.exit();