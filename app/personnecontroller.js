app.controller('personneController', function($scope, $http, $location, $window){
	 
$scope.success = false;

	$scope.error = false;

	$scope.fetchData = function(){
		$http.get('../php/fetch_personne.php').success(function(data){
			$scope.personnesData = data;
		});
	};

	$scope.openModal = function(){
		var modal_popup = angular.element('#crudmodal');
		modal_popup.modal('show');
	};

	$scope.closeModal = function(){
		var modal_popup = angular.element('#crudmodal');
		modal_popup.modal('hide');
	};


	$scope.addData = function(){
		$scope.modalTitle = 'Ajouter une personne';
		$scope.submit_button = 'Insert';
		$scope.openModal();
		$scope.nom="";
		$scope.prenom="";
		$scope.sexe="";
		
		
	};

	$scope.submitForm = function(){
		$http({
			method:"POST",
			url:"../php/insertpersonne.php",
			data:{'nom':$scope.nom, 'prenom':$scope.prenom, 'sexe':$scope.sexe, 'action':$scope.submit_button, 'id':$scope.hidden_id}
		}).success(function(data){
			if(data.error != '')
			{
				$scope.success = false;
				$scope.error = true;
				$scope.errorMessage = data.error;
			}
			else
			{
				$scope.success = true;
				$scope.error = false;
				$scope.successMessage = data.message;
				$scope.form_data = {};
				$scope.closeModal();
				$scope.fetchData();
			}
		});
	};

	$scope.fetchSingleData = function(id){
		$http({
			method:"POST",
			url:"../php/insertpersonne.php",
			data:{'id':id, 'action':'fetch_single_data'}
		}).success(function(data){

			
			$scope.nom = data.nom;
			//$scope.prenom = data.prenom;
			//$scope.sexe = data.sexe;
			$scope.hidden_id = id;
			//$scope.modalTitle = 'Edit Data';
			//$scope.submit_button = 'Edit';
			//$scope.openModal();
			$window.location.href = "detailpersonne.html?id="+id;
		});
	};

	$scope.deleteData = function(id){
		if(confirm("Are you sure you want to remove it?"))
		{
			$http({
				method:"POST",
				url:"../php/insertpersonne.php",
				data:{'id':id, 'action':'Delete'}
			}).success(function(data){
				$scope.success = true;
				$scope.error = false;
				$scope.successMessage = data.message;
				$scope.fetchData();
			});	
		}
	};

	

});
