app.controller('egliseController', function($scope, $http){
	 $(document).ajaxStart(function() { Pace.restart(); });
$scope.success = false;

	$scope.error = false;

	$scope.fetchData = function(){
		$http.get('../php/fetch_data.php').success(function(data){
			$scope.eglisesData = data;
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
		$scope.modalTitle = 'Add Data';
		$scope.submit_button = 'Insert';
		$scope.openModal();
		$scope.nomeglise="";
		
	};

	$scope.submitForm = function(){
		$http({
			method:"POST",
			url:"../php/insert.php",
			data:{'nomeglise':$scope.nomeglise,  'action':$scope.submit_button, 'id':$scope.hidden_id}
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
			url:"../php/insert.php",
			data:{'id':id, 'action':'fetch_single_data'}
		}).success(function(data){
			$scope.nomeglise = data.nomeglise;
			$scope.hidden_id = id;
			$scope.modalTitle = 'Edit Data';
			$scope.submit_button = 'Edit';
			$scope.openModal();
		});
	};

	$scope.deleteData = function(id){
		if(confirm("Are you sure you want to remove it?"))
		{
			$http({
				method:"POST",
				url:"../php/insert.php",
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
