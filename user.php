<?php
    include("db.php");
    $query = "SELECT * FROM users WHERE aquired=0 limit 1;";
    $result = $conn->query($query);
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        // print_r($row['id']." ".$row['name']."\n");
        $data['user_id'] = $row['id'];
        $data['color'] = $row['color'];
        $conn->query("UPDATE users SET aquired=1 WHERE id=".$row['id'].";");
    }
    header('Content-Type: application/json');
    echo json_encode($data);
?>