angular
  .module('dogPark', ['satellizer', 'angular-jwt', 'ui.router', 'ngResource'])
  .constant('API_URL', 'http://localhost:8000')
  .config(oauthConfig)
  .config(Router);

oauthConfig.$inject = ['API_URL', '$authProvider', 'FACEBOOK_DOGPARK_API_KEY'];
Router.$inject = ['$stateProvider', '$urlRouterProvider'];

function oauthConfig(API_URL, $authProvider, FACEBOOK_DOGPARK_API_KEY) {
  $authProvider.facebook({
    url: API_URL + '/auth/facebook',
    clientId: FACEBOOK_DOGPARK_API_KEY
  });

  $authProvider.tokenPrefix = null;
};  

function Router($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {
    url: '/', 
    templateUrl: 'home.html'
  })
  .state('map', {
    url: '/map',
    templateUrl: 'map.html'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'profile.html'
  });

  $urlRouterProvider.otherwise('/');
}; 

angular.module('dogPark')
  .directive('map', Gmap);

function Gmap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      markers: '='
    },
    link: function(scope, $element, attr) {
      console.log("scope updated!");
      
      if(!scope.center) throw new Error("You must provide a center for your map directive");

      var map = new google.maps.Map($element[0], {
        center: scope.center,
        zoom:10
      });

      var markers = [];

      function removeAllMarkers() {
        markers.forEach(function(marker) {
          marker.setMap(null);
        });

        markers = [];
      }

      scope.$watch('markers', function(newVal, oldVal) {
        console.log("Rebuilding markers!");

        scope.markers = newVal;
        removeAllMarkers();

        scope.markers.forEach(function(marker) {
          var gMarker = new google.maps.Marker({
            position: marker.position,
            map: map, 
            icon: "images/paw2.png"
          });

          markers.push(gMarker);

          // create info window here
          // populate info window with data from marker object

          var content = '<div class="info-window"><h4>' + marker.name + '</h4>';

          marker.pets.forEach(function(pet) {
            content += '<h5>' + pet.name + ' (' + pet.breed + ')<h5>';
          });

          content += '</div>';

          var infoWindow = new google.maps.InfoWindow({
            content: content
          });

          gMarker.addListener('click', function() {
            infoWindow.open(map, gMarker);
          });
        });

      }, true);

    }
  }
}
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
angular.module('dogPark')
       .controller('UsersController', UsersController);

UsersController.$inject = ['$resource', 'tokenService'];
function UsersController($resource, tokenService) {
  var self = this;


  var User = $resource('http://localhost:8000/users/:id', { id: '@_id' }, { update: {method: "PATCH"}});
  var Pet  = $resource('http://localhost:8000/pets/:id', { id: '@_id' }, { update: {method: "PATCH"}});

  this.user = {};
  this.pet = {};

  this.currentUser = tokenService.getUser();

  this.all = User.query();

  this.selectUser = function(user) {
    console.log("click");
    self.selectedUser = User.get({ id: user._id });
  }
 
  this.addPet = function(){

    this.pet.userId = this.currentUser._id;

    Pet.save(this.pet, function(pet) {
      console.log('save');
      self.all.push(pet);
      self.pet = {};
    });
  }

  this.editUser = function(user){
    self.user = user;
  }

  this.deleteUser = function(user){
    User.delete({id: user._id});
    var index = self.all.indexOf(user);
    self.all.splice(index, 1);
  }
}
angular.module('dogPark')
  .constant('FACEBOOK_DOGPARK_API_KEY', '1538370623124177');
angular.module('dogPark')
  .service('tokenService', TokenService);

TokenService.$inject = ['$window', 'jwtHelper'];
function TokenService($window, jwtHelper) {
  var self = this;

  self.getToken = function() {
    return $window.localStorage.getItem('token');
  }

  self.removeToken = function() {
    $window.localStorage.removeItem('token');
  }

  self.getUser = function() {
    var token = self.getToken();
    return token ? jwtHelper.decodeToken(token) : null;
  }
}