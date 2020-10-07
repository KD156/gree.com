<?php
include './conn.php';

$username = $_REQUEST['username'];
$phone = $_REQUEST['phone'];
$password = $_REQUEST['password'];
$email = $_REQUEST['email'];

$sql = "select * from users where username='$username'";

$res = $mysqli->query($sql);

if ($res->num_rows > 0) {
    echo '<script>alert("用户名已存在")</script>';
    echo '<script>location.href="http://127.0.0.1/h5-2006/gree.com/projectname/src/registry.html';
    $myslqi->close();
    die();
}

$inser = "insert into users (username,password,phone,email) values('$username','$password','$phone','$email')";
$ree = $mysqli->query($inser);
$mysqli->close();
if ($res) {
    echo '{"zt":true}';
}
