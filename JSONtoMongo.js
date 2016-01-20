'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'),
    listings = require('./listings.json'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
 console.log('Number of entries:' + listings.entries.length);
 for (var i = 0; i < listings.entries.length; i++) {

  //Get each listing from file
  var listingFromFile = listings.entries[i];

  //We want a new listing to add to the DB
  var listingToDB;

  //Make sure the listing has coordinates; if it doesn't, null the coords/address fields for uniformity
  if (listingFromFile.hasOwnProperty('coordinates')) {

    //Create the new Listing based off of the Listing Schema
    listingToDB = new Listing({
      code: listingFromFile.code,
      name: listingFromFile.name,
      coordinates: {
        latitude: listingFromFile.coordinates.latitude,
        longitude: listingFromFile.coordinates.longitude
      },
      address: listingFromFile.address
    });
  } else {
    listingToDB = new Listing({
      code: listingFromFile.code,
      name: listingFromFile.name,
      coordinates: {
        latitude: null,
        longitude: null
      },
      address: ''
    });
  }

  //Save each entry and log to console
  listingToDB.save(function(err) {
    if (err) throw err;
  });

  //For debugging purposes
  console.log('Saving entry #' + i + ':' + listingToDB.code);

 }; //end for-loop

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */

 //ENTRIES CONFIRMED IN DB!