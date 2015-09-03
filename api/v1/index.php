<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/


// Companies
$app->get('/companies', function() { 
    global $db;    
	$rows = $db->select("companies","CompanyID,Name,Address,City,Country,Email,Phone,status,Directors",array());
    echoResponse(200, $rows);
});

$app->post('/companies', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('Name','Address','City','Country');
    global $db;
    $rows = $db->insert("companies", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Company added successfully.";
    echoResponse(200, $rows);
});

$app->put('/companies/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('CompanyID'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("companies", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Company information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/companies/:id', function($id) { 
    global $db;
    $rows = $db->delete("companies", array('CompanyID'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Company removed successfully.";
    echoResponse(200, $rows);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>