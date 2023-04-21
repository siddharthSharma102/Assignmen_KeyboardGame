<?php
    $divId = "div".$_POST['divId'];
    $color = $_POST['color'];
    $file_path = 'data.txt';
    $file_handle = fopen($file_path, 'r+');
    $previous_contents = fread($file_handle, filesize($file_path));
    $json_data = json_decode($previous_contents, true);
    $json_data[$divId] = $color;
    $new_contents = json_encode($json_data);
    // fwrite($file_handle, 0);
    fwrite($file_handle, '');
    file_put_contents($file_path, $new_contents);
    print_r ($new_contents.'\n');
    fclose($file_handle);
?>