var app = angular.module('simpleApp',['ngAnimate']);

app.controller('simpleController', function($scope) {
    $scope.sequenceObj=[
    	{title:'Pic 1', id:'1'},
    	{title:'Pic 2', id:'2'},
    	{title:'Pic 3', id:'3'},
    	{title:'Pic 4', id:'4'},
    	{title:'Pic 5', id:'5'},
    	{title:'Pic 6', id:'6'},
    	{title:'Pic 7', id:'7'},
    	{title:'Pic 8', id:'8'}
    ]; 

    $scope.getSpriteStyle = function(id) {
	        console.log('background-position: 0 ' + (id * 100) + 'px;');
	        return (id * 100) + 'px' + ' 0';
	    }
});
 
app.directive('simpleAnimation', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
	scope:{
		sequences: '='
	},
    link: function (scope, elem, attrs) {
	
		scope.currentIndex=0;

		scope.next=function(){
			scope.currentIndex<scope.sequences.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.sequences.length-1;
		};
		
		scope.$watch('currentIndex',function(){
			scope.sequences.forEach(function(seq){
				seq.visible=false;
			});
			scope.sequences[scope.currentIndex].visible=true;
		});
		
		/* Start: For Automatic slideshow*/
		
		var timer;
		
		var aniSequenceFunc=function(){
			if( scope.currentIndex < 9 ) {
				timer=$timeout(function(){
					scope.next();
					timer=$timeout(aniSequenceFunc,50);
				},50);
			}
		};
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		aniSequenceFunc();

		
    },
	templateUrl:'templates/simpletmp.html'
  }
});