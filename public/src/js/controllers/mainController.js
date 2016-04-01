angular
  .module('dogPark')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', 'tokenService'];
function MainController($auth, tokenService) {

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