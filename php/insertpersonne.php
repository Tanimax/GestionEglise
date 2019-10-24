<?php

//insert.php

include('database_connection.php');

$form_data = json_decode(file_get_contents("php://input"));

$error = '';
$message = '';
$validation_error = '';
$nom = '';
$prenom = '';
$sexe = '';



if($form_data->action == 'fetch_single_data')
{
	$query = "SELECT * FROM tbl_personne WHERE id='".$form_data->id."'";
	$statement = $connect->prepare($query);
	$statement->execute();
	$result = $statement->fetchAll();
	foreach($result as $row)
	{
		$output['nom'] = $row['nom'];
		$output['prenom'] = $row['prenom'];
		$output['sexe'] = $row['sexe'];
		
		
	}
}
elseif($form_data->action == "Delete")
{
	$query = "
	DELETE FROM tbl_personne WHERE id='".$form_data->id."'
	";
	$statement = $connect->prepare($query);
	if($statement->execute())
	{
		$output['message'] = 'Supprimer avec succès';
	}
}
else
{
	if(empty($form_data->nom))
	{
		$error[] = 'Nom is Required';
	}
	else
	{
		$nom = $form_data->nom;
	}
	if(empty($form_data->prenom))
	{
		$error[] = 'Prenom is Required';
	}
	else
	{
		$prenom = $form_data->prenom;
	}
	if(empty($form_data->sexe))
	{
		$error[] = 'Sexe is Required';
	}
	else
	{
		$sexe = $form_data->sexe;
	}

	

	
	if(empty($error))
	{
		if($form_data->action == 'Insert')
		{
			$data = array(
				':nom'		=>	$nom,
				':prenom'		=>	$prenom,
				':sexe'		=>	$sexe
			);
			$query = "
			INSERT INTO tbl_personne 
				(nom, prenom, sexe) VALUES 
				(:nom, :prenom, :sexe)
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
				':nom'		=>	$nom,
				':prenom'		=>	$prenom,
				':sexe'		=>	$sexe,
				':id'			=>	$form_data->id
			);
			$query = "
			UPDATE tbl_personne 
			SET nom = :nom, prenom = :prenom, sexe = :sexe
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