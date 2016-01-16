angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    //Show a default listing before one is pressed
    $scope.detailedInfo = {
      code: $scope.listings[0].code,
      name: $scope.listings[0].name,
      coordinates: {
        latitude: $scope.listings[0].latitude,
        longitude: $scope.listings[0].longitude
      },
      address: $scope.listings[0].address
    };

    $scope.newItem = {
      code: '',
      name: '',
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      address: ''
    };

    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
    $scope.addListing = function() {
      //assign a new entry with the info needed
      var newListing = {
        code: $scope.newItem.code,
        name: $scope.newItem.name,
        address: $scope.newItem.address,
        coordinates: {
          latitude: $scope.newItem.coordinates.latitude,
          longitude: $scope.newItem.coordinates.longitude
        }
      };

      //actually add the listing
      $scope.listings.push(newListing);

      //nullify the fields
      nullifyNewListing();
    };

    $scope.deleteListing = function(index) {
      $scope.listings.splice(index, 1);
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };

    //Encapsulate the nullifying of the fields
    var nullifyNewListing = function () {
      $scope.newItem.code = '';
      $scope.newItem.name = '';
      $scope.newItem.address = '';
      $scope.newItem.coordinates.latitude = 0;
      $scope.newItem.coordinates.longitude = 0;
    }
  }
]);