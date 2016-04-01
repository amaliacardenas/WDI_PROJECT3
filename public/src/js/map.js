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