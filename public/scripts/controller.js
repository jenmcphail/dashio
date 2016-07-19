var dashioApp = angular.module("dashioApp", []);
 
dashioApp.config(function($httpProvider) {
  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;
  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

dashioApp.controller("dashioCtrl", function(){
  console.log("controller connected")

});

dashioApp.controller('QuoteCtrl', QuoteCtrl);
dashioApp.controller('WeatherCtrl', WeatherCtrl)
dashioApp.controller('TrafficCtrl', TrafficCtrl);



  function QuoteCtrl ($scope, $http){
    $http.get("http://quotes.rest/qod.json")
          .success(function(response){
              console.log(response.contents.quotes[0])
              $scope.quote = response.contents.quotes[0];
          });
  };

  
  function WeatherCtrl ($scope, $http){
    console.log("it works")
    $http.get("http://api.openweathermap.org/data/2.5/weather?zip=94121,us&appid=3ad9bfcab1c3432e7973037740b23572")
          .success(function(response){
              console.log(response)
              // $scope.weather = response;
          });
  };


  function TrafficCtrl ($scope, $http){
    $http.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyAN5Gz5suaXSGUFnF5tOWGRrRKKR1Pq8xE")
          .success(function(response){
              console.log(response)
              // $scope.duration = response.rows.elements.duration.text;
          });
  };

  

//   dashioApp.directive('currentWeather', function() {
//   return {
//     restrict: 'E',
//     scope: {
//       city: '@'
//     },
//     template: '<div class="current-weather"><h1>Weather for {{city}}</h4>{{weather.main.temp}}</div>',
//     controller: ['$scope', '$http', function($scope, $http){
//                 var url="http://api.openweathermap.org/data/2.5/weather?mode=json&cnt=7&units=imperial&callback=JSON_CALLBACK&q=";
//                 var apikey = "&appid=3ad9bfcab1c3432e7973037740b23572"
//                 $scope.getWeather = function(city){
//                     $http({method: 'JSONP', url: url + city + apikey})
//                         .success(function(data){
//                             $scope.weather = data;
//                         });
//                 }
//             }],
//     link: function (scope, element, attrs) {
//       scope.weather = scope.getWeather(attrs.city);
//     }
//   }
// });


