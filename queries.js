/* Import the necessities */

var mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

/* Fill out these functions using Mongoose queries*/

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   Listing.find({name: 'Library West'}, function(err, doc) {
    //throw error if found
    if (err) throw err;

    //otherwise print listing to console
    console.log('Found: ' + doc);
   });
};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  Listing.findOneAndRemove({ code: 'CABL' }, function(err, doc) {
    if (err) throw err;

  // we have deleted the user
    console.log('Doc deleted: ' + doc);
  });

};

var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. New address: 100 Phelps Lab, Gainesville, FL, 32611
   */
  Listing.findOneAndUpdate({ name: 'Phelps Laboratory' }, { address: '100 Phelps Lab, Gainesville, FL, 32611' }, function(err, doc) {
    if (err) throw err;

    // we have the updated user returned to us
    console.log('Entry updated: ' + doc);
  });
};

var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   Listing.find({}, function(err, doc) {
    if (err) throw err;

    console.log('Displaying All Entries: ' + doc);
   }).sort('name'); 
   //For some reason in my entries, the order for _id did not correspond to the order for name,
   //which is strange given that they were added in alphabetical order...
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();