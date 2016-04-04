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
            animation: google.maps.Animation.BOUNCE,  
            icon: "images/paw2.png"
          });

          markers.push(gMarker);

          // create info window here
          // populate info window with data from marker object

          var infoWindow = new google.maps.InfoWindow({
            content: '<div class="info-window">' + marker.name + '</div>',
          });

          gMarker.addListener('click', function() {
            infoWindow.open(map, gMarker);
          });
        });

      }, true);

    }
  }
}