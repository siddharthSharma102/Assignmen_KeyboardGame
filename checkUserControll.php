<?php
// $data = file_get_contents("activeUser.txt");
// echo empty($data) ? '' : $data;

    $file_path = 'activeUser.txt';
    $file_handle = fopen($file_path, 'r+');
    $json_data = fread($file_handle, filesize($file_path));
    $data = json_decode($json_data, true)['Active-User'];
    echo $data=='-' ? "NA" : $data;
    fclose($file_handle);
?>