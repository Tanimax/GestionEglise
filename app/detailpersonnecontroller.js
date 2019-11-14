app.controller('detailpersonneController', function($scope, $rootScope, $http, $location, $window){
	 
$scope.success = false;

	$scope.error = false;
	$scope.test=$location.search()['id'];
 	$scope.date = new Date();

	var url_string =window.location.href;
	var url = new URL(url_string);
	var c = url.searchParams.get("id");
	console.log(c);
$scope.test= url.searchParams.get("id");
	$scope.fetchSingleData = function(id){
		$http({
			method:"POST",
			url:"../php/insertpersonne.php",
			data:{'id':id, 'action':'fetch_single_data'}
		}).success(function(data){

			
			$scope.nom = data.nom;
			$scope.prenom = data.prenom;
			
			$scope.sexe = data.sexe;
			$scope.hidden_id = id;
			
		});
	};

	
	

	//$scope.test=$rootScope.nom;

	

});
