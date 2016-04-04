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
