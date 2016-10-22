angular.module('app', [])

.controller('appCtrl', function($scope, rectangleService){
  $scope.rectangles = rectangleService.ractangleList;
  $scope.rectangle = rectangleService.model;

  $scope.$watch('rectangle', function(data){
    $scope.visualRectangle = rectangleService.visualRectangle(data)     
  }, true);
  
  $scope.save = function(data){
    rectangleService.addRectangle(data);
    $scope.rectangles = rectangleService.getRectangles();
  };
})

.service('rectangleService', function(){
  this.ractangleList = [];

  this.model = {
    number: 22,
    color: 'yellow',
    size: 25       
  };

  this.visualRectangle = function(data){
    return {
      'background-color': data.color,
      'width': data.size + 'px',
      'height': data.size + 'px'      
    }
  }

  this.addRectangle = function(data){
    this.ractangleList.push({
      number: data.number,
      color: data.color,
      size: data.size,
      visual: {
          'background-color': data.color,
          'width': data.size + 'px',
          'height': data.size + 'px'      
        }        
    });
  };

  this.getRectangles = function(data){
    return this.ractangleList;
  };
});