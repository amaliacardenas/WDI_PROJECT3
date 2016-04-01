angular
  .module('satellizerApp', ['satellizer', 'angular-jwt'])
  .constant('API_URL', 'http://localhost:3000')
  .config(oauthConfig);

oauthConfig.$inject = ['API_URL', '$authProvider', 'FACEBOOK_DOGPARK_API_KEY'];

function oauthConfig(API_URL, $authProvider, FACEBOOK_DOGPARK_API_KEY) {
  $authProvider.facebook({
    url: API_URL + '/auth/facebook',
    clientId: FACEBOOK_DOGPARK_API_KEY
  });

  $authProvider.tokenPrefix = null;
}  
angular
  .module('satellizerApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', 'tokenService'];
function MainController($auth, tokenService) {

  var self = this;

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
angular.module('satellizerApp')
  .constant('FACEBOOK_DOGPARK_API_KEY', '1538370623124177');
angular.module('satellizerApp')
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