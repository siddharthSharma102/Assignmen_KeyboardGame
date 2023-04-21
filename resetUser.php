<?
    include("db.php");
    $uid = $_POST['user_id'];
    try{
        $conn->query("UPDATE users SET aquired=0 WHERE id=".$uid.";");
    } catch(Exception $ex){
        echo json_encode(array("msg"=>$ex->getMessage(),"teace"=>$ex->getTrace()));
    }
?>