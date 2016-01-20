/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
//I figure code and name should both be unique and required. The other fields, not so much.
var listingSchema = new Schema({
  code: { type: String, required: true,  unique: true },
  name: { type: String, required: true,  unique: true },
  coordinates: {
  	latitude: Number,
  	longitude: Number
  },
  address: String,
  updated_at: Date,
  created_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {

  var currentDate = new Date();

  //if hasn't been created yet, set the date
  if (!this.created_at) {
  	this.created_at = currentDate;
  }

  //always update this field
  this.updated_at = currentDate;

  //move to the next entry
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
