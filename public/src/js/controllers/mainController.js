angular
  .module('dogPark')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', 'tokenService', '$scope'];
function MainController($auth, tokenService, $scope) {
  console.log("Loaded!");
  var self = this;

  this.mapCenter = {lat: 51.4802, lng: -0.0193 };
  this.mapMarkers = [{
    name: "Buckingham Palace",
    position: { lat: 51.501364, lng: -0.14189 }
  },{
    name: "Emirates Stadium",
    position: { lat: 51.5548918, lng: -0.1106267 }
  }]

  this.isLoggedIn = function() {
    return !!tokenService.getToken();
  }

  this.currentUser = tokenService.getUser();

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        self.currentUser = tokenService.getUser();
      });
  }

  this.logout = function() {
    tokenService.removeToken();
    this.currentUser = null;
  }

  this.geoMessage = null;
  this.location = null;

  this.geoFindMe = function() {

    if (!navigator.geolocation){
      self.geoMessage = "Geolocation is not supported by your browser";
      return;
    }

    function success(position) {
      console.log("success!");  
      $scope.$applyAsync(function() {
        self.geoMessage = null;
        self.location = position.coords;
        self.mapMarkers.push({ name: "Me", position: { lat: self.location.latitude, lng: self.location.longitude } });
      });
    };

    function error() {
      self.geoMessage = "Unable to retrieve your location";
    };

    self.geoMessage = "Locating…";

    navigator.geolocation.getCurrentPosition(success, error);
  }

}