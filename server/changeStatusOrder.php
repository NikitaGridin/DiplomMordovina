<?php
include './conn.php'; 
include './headers.php';

$orderId = $_POST['orderId'];
$status = $_POST['status'];

$sql = "UPDATE orders SET status = '$status' WHERE id = $orderId";

if (mysqli_query($conn, $sql)) {
    echo "Статус заказа успешно изменен";
} else {
    echo "Ошибка при изменении статуса заказа: " . mysqli_error($conn);
}

mysqli_close($conn);
?>