var dashioApp = angular.module("dashioApp", []);

dashioApp.controller("dashioCtrl", function(){
  console.log("controller connected")

});

dashioApp.directive('currentWeather', function() {
  return {
    restrict: 'E',
    scope: {
      city: '@'
    },
    template: '<div class="current-weather"><h4>Weather for {{city}}</h4>{{weather.main.temp}}</div>',
    controller: ['$scope', '$http', function($scope, $http){
                var url="http://api.openweathermap.org/data/2.5/weather?mode=json&cnt=7&units=imperial&callback=JSON_CALLBACK&q=";
                var apikey = "&appid=3ad9bfcab1c3432e7973037740b23572"
                $scope.getWeather = function(city){
                    $http({method: 'JSONP', url: url + city + apikey})
                        .success(function(data){
                            $scope.weather = data;
                        });
                }
            }],
    link: function (scope, element, attrs) {
      scope.weather = scope.getWeather(attrs.city);
    }
  }
});

dashioApp.directive('inspoQuote', function() {
  return {
    restrict: 'E',
    scope: {
      // city: '@'
    },
    template: '<div class="quote"><h5>{{quote}}</h5><p>{{author}}</p></div>',
    controller: ['$scope', '$http', function($scope, $http){
                var url="http://quotes.rest/qod.json";
                // var apikey = "&appid=3ad9bfcab1c3432e7973037740b23572"
                $scope.getQuote = function(quote){
                    $http({method: 'JSONP', url: url})
                        .success(function(data){
                            $scope.quote = data;
                        });
                }
            }],
    link: function (scope, element, attrs) {
      scope.quote = scope.getQuote(attrs.quote);
    }
  }
});