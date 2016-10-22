angular.module('app', [])

.controller('appCtrl', function($scope, rectangleService, validationService){
  $scope.rectangles = rectangleService.ractangleList;
  $scope.rectangle = rectangleService.model;

  $scope.$watch('rectangle', function(data){
    $scope.visualRectangle = rectangleService.visualRectangle(data)     
  }, true);

  $scope.save = function(data){
    $scope.errors = validationService.form(data)
    if($scope.errors.length === 0 ){
      rectangleService.addRectangle(data);
      $scope.rectangles = rectangleService.getRectangles();
    }
  };
})

.service('validationService', function(){
  this.form = function(data) {
    var errors = [];
    
    if(typeof data === 'undefined' || !data.number || !data.color || !data.size) {
      errors.push('all fields are required');
    }
    else {
      if(isNaN(data.number)){
        errors.push('its not a number')
      }
      if(data.number < 18 || data.number > 100){
        errors.push('number must be between 18 and 100')
      }
      if(data.color === 'yellow' && data.number == 20){
        errors.push('you can`t add rectangle with yellow color and number 20.')
      }
    }
    return errors
  }
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