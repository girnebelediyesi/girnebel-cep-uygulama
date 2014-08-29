<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=utf-8');

include_once("config.php");

mysql_query ("set character_set_client='utf8'"); 
mysql_query ("set character_set_results='utf8'"); 
mysql_query ("set collation_connection='utf8_turkish_ci'"); 
$type_tr = isset($_GET['type_tr']) ? $_GET['type_tr'] : '';
$name = isset($_GET['name']) ? $_GET['name'] : '';
$bUnique = isset($_GET['bUnique']) ? $_GET['bUnique'] : '';
//

if($type_tr && $name){
	$sql = "SELECT * FROM poi where Type_tr = '$type_tr' AND Name = '$name'";
}else if ($type_tr) {
	if($bUnique)
		$sql = "SELECT DISTINCT Name FROM poi where Type_tr = '$type_tr'";
	else
		$sql = "SELECT * FROM poi where Type_tr = '$type_tr'";
}else {
	if($bUnique)
		$sql = "SELECT DISTINCT Type_tr FROM poi";
	else
		$sql = "SELECT * FROM poi";
}

//print_r($sql);
$result = mysql_query($sql) or die ("Query error: " . mysql_error());

$records = array();

while($row = mysql_fetch_assoc($result)) {
	$records[] = $row;
}

//print_r($records);

//encode
echo json_encode($records);
exit();
?>