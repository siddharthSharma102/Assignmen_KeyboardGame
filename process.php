<?php
$error = array('error' => 'Error message here');
header('Content-Type: application/json');
echo json_encode($error);
    // include('db.php');
    // $query = "SELECT * FROM testtable;";
    // $result = $conn->query($query);

    // $data = array();
    // while ($row = mysqli_fetch_assoc($result)) {
    //     $data[] = $row;
    // }
    // header('Content-Type: application/json');
    // echo gettype(json_encode($data));
?>