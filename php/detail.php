<?php
include './conn.php';

$id=$_GET['sid'];

$sql="select * from gree where sid='$id'";

$res=$mysqli->query($sql);

echo json_encode($res->fetch_assoc());