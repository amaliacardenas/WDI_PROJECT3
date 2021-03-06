angular
  .module('dogPark')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', 'tokenService',  '$window', '$scope'];
function MainController($auth, tokenService, $window, $scope) {
  console.log("Loaded!");

  var socket = $window.io();
  var self = this;

  socket.on('checkin', function(user) {
    $scope.$applyAsync(function() {
      self.mapMarkers.push(user);
    });
  });

  this.mapCenter = {lat: 51.4802, lng: -0.0193 };
  this.mapMarkers = [];

  this.isLoggedIn = function() {
    return !!tokenService.getToken();
  }

  this.currentUser = tokenService.getUser();

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        self.currentUser = tokenService.getUser();
        console.log(self.currentUser);
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
      self.geoMessage = null;
      self.location = position.coords;
      socket.emit('checkin', {
        _id: self.currentUser._id,
        name: self.currentUser.name,
        pets: self.currentUser.pets,
        position: { lat: self.location.latitude, lng: self.location.longitude }
      });
    };

    function error() {
      self.geoMessage = "Unable to retrieve your location";
    };

    self.geoMessage = "Locating…";

    navigator.geolocation.getCurrentPosition(success, error);
  }


  // socket.on('message', function(message){
  //   $scope.$applyAsync(function(){
  //   self.messages.push(message);
  //   });
  // });


  // self.sendMessage = function() {
  //   socket.emit('message', {text: self.message, name: self.name, picture: self.picture, pets: self.pets});
  //   self.message = null;
  // }
}