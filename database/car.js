var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
var Schema = mongoose.Schema;

var carSchema = new Schema({
  id: { type : String , unique : true, required : true},
  year: Number,
  make: String,
  model: String,
  trans: String,
  hwy: Number,
  city: Number,
  comb: Number,
  drive: String,
  fueltype: String,
  fueltype1: String,
  class: String
});
var Car = mongoose.model('Car', carSchema);

module.exports = Car;