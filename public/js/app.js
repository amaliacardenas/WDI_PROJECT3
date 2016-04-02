angular
  .module('dogPark', ['satellizer', 'angular-jwt', 'ui.router'])
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
      if(!scope.center) throw new Error("You must provide a center for your map directive");
      var map = new google.maps.Map($element[0], {
        center: scope.center,
        zoom:10
      });

      if(scope.markers) {
        scope.markers.forEach(function(marker) {
          new google.maps.Marker({
            position: marker.position,
            map: map,
            animation: google.maps.Animation.BOUNCE
          });
        });
      }
    }
  }
}
angular
  .module('dogPark')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', 'tokenService'];
function MainController($auth, tokenService) {
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