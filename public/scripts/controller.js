var dashioApp = angular.module("dashioApp", []);

dashioApp.config(function($httpProvider) {
  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;
  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

dashioApp.controller("dashioCtrl", function($scope){
  console.log("controller connected");
});

dashioApp.controller('QuoteCtrl', QuoteCtrl);
dashioApp.controller('WeatherCtrl', WeatherCtrl)
dashioApp.controller('TrafficCtrl', TrafficCtrl);
dashioApp.controller('NewsCtrl', NewsCtrl);
dashioApp.controller('TimeCtrl', TimeCtrl);



  function QuoteCtrl ($scope, $http){
    $http.get("http://quotes.rest/qod.json")
          .success(function(response){
              console.log(response.contents.quotes[0])
              $scope.quote = response.contents.quotes[0];
          });
  };

  
  function WeatherCtrl ($scope, $http){
    $http.get("http://api.openweathermap.org/data/2.5/weather?zip=94121,us&units=imperial&appid=3ad9bfcab1c3432e7973037740b23572")
          .success(function(response){
              console.log(response)
              $scope.weather = response;
          });
  };


  function TrafficCtrl ($scope, $http){
    $http.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyAN5Gz5suaXSGUFnF5tOWGRrRKKR1Pq8xE", {headers: {Authorization: undefined}})
          .success(function(response){
              console.log(response)
              $scope.duration = response
          });
  };

  function NewsCtrl ($scope, $http){
    $http.get("https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=ef4c0de3c37e4e9ca711527bd7646dca")
          .success(function(response){
              console.log(response)
              $scope.news = response;
          });
  };

  function TimeCtrl($scope, $timeout) {
    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms

    var tick = function() {
        $scope.clock = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }
    $timeout(tick, $scope.tickInterval);
};

  

