console.log("bringing up models");


//var mongoose = require('mongoose');
//var Schema = mongoose.Schema

///* GEOLOG */

//var geologSchema = new Schema({
	//comentario: {type: String, required: false},
	//timestamp: {type: Date, "default": Date.now, required: true}
//});

///* LUGARES */

//var lugarSchema = new Schema({
  //nombre: {type: String, unique: true, required: true},
  //nombre_largo: {type: String, unique: false, required: false},
  //geo: {type: [Number], index: '2dsphere'},
  //geolog: [geologSchema]
  //},
	//{toJSON: {virtuals: true}}); // when converting to JSON, output also virtuals
	

////lugarSchema.virtual('pretty').get(function () {
	////return this.nombre + " (" + this.nombre_largo + ")";
////});
	

//mongoose.model('geolog', geologSchema, 'geologs');
//mongoose.model('lugar', lugarSchema, 'lugares');
