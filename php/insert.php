<?php

//insert.php

include('database_connection.php');

$form_data = json_decode(file_get_contents("php://input"));

$error = '';
$message = '';
$validation_error = '';
$nomeglise = '';


if($form_data->action == 'fetch_single_data')
{
	$query = "SELECT * FROM tbl_eglise WHERE id='".$form_data->id."'";
	$statement = $connect->prepare($query);
	$statement->execute();
	$result = $statement->fetchAll();
	foreach($result as $row)
	{
		$output['nomeglise'] = $row['nomeglise'];
		
	}
}
elseif($form_data->action == "Delete")
{
	$query = "
	DELETE FROM tbl_eglise WHERE id='".$form_data->id."'
	";
	$statement = $connect->prepare($query);
	if($statement->execute())
	{
		$output['message'] = 'Supprimer avec succès';
	}
}
else
{
	if(empty($form_data->nomeglise))
	{
		$error[] = 'Nom eglise is Required';
	}
	else
	{
		$nomeglise = $form_data->nomeglise;
	}

	
	if(empty($error))
	{
		if($form_data->action == 'Insert')
		{
			$data = array(
				':nomeglise'		=>	$nomeglise
			);
			$query = "
			INSERT INTO tbl_eglise 
				(nomeglise) VALUES 
				(:nomeglise)
			";
			$statement = $connect->prepare($query);
			if($statement->execute($data))
			{
				$message = 'Inserer avec succès';
			}
		}
		if($form_data->action == 'Edit')
		{
			$data = array(
				':nomeglise'	=>	$nomeglise,
				':id'			=>	$form_data->id
			);
			$query = "
			UPDATE tbl_eglise 
			SET nomeglise = :nomeglise
			WHERE id = :id
			";

			$statement = $connect->prepare($query);
			if($statement->execute($data))
			{
				$message = 'modifié avec succès';
			}
		}
	}
	else
	{
		$validation_error = implode(", ", $error);
	}

	$output = array(
		'error'		=>	$validation_error,
		'message'	=>	$message
	);

}



echo json_encode($output);

?>