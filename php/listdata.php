<?php
include './conn.php';

$pagesize = 12; 

$sql = "select * from gree";

$res = $mysqli->query($sql);

$num = $res->num_rows; 

$pagenum = ceil($num / $pagesize);  //计算分页数

//获取前端的传来的页面，根据页码查询对应的数据，返回给前端。
if (isset($_GET['page'])) {
    $pagevalue = $_GET['page'];
} else {
    $pagevalue = 1;
}

$page = ($pagevalue - 1) * $pagesize;

$sql1 = "select * from gree limit $page,$pagesize";

$result = $mysqli->query($sql1);

$arr = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}
echo json_encode($arr);