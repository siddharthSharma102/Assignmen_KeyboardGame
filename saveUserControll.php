<?php
$userdata = file_get_contents("activeUser.php");
$user = $_POST['user'];
try{
    $json_data = json_encode(array("Active-User"=>$user));
    file_put_contents("activeUser.php", $json_data);
    echo "DONE";
} catch(Exception $e){
    echo array("message"=>$e->getMessage(), "trace"=>$e.getTrace());
}
?>