<?php
include './conn.php'; 
include './headers.php';

$sql = "SELECT orders.id as order_id, orders.created_at as order_created_at, users.name as user_name, users.surname as user_surname, users.numberPhone as user_phone, orders.allprice as order_allprice, orders.count as order_count, orders.status as order_status, product_orders.count as product_count, product.*
        FROM orders
        INNER JOIN user_order ON orders.id = user_order.orderID
        INNER JOIN product_orders ON orders.id = product_orders.orderId
        INNER JOIN product ON product_orders.productId = product.id
        INNER JOIN users ON user_order.userId = users.id";

$result = mysqli_query($conn, $sql);

$orders = array();
while ($row = mysqli_fetch_assoc($result)) {
    $order_id = $row['order_id'];
    if (!isset($orders[$order_id])) {
        $order = array(
            'id' => $row['order_id'],
            'created_at' => $row['order_created_at'],
            'allprice' => $row['order_allprice'],
            'count' => $row['order_count'],
            'status' => $row['order_status'],
            'products' => array(),
        );
        $orders[$order_id] = $order;
    }
    $product = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'info' => $row['info'],
        'price' => $row['price'],
        'img' => $row['img'],
        'user_name' => $row['user_name'],
        'user_surname' => $row['user_surname'],
        'user_phone' => $row['user_phone'],
        'wt' => $row['wt'],
        'count' => $row['product_count'],
    );
    $orders[$order_id]['products'][] = $product;
}

$json = json_encode(array_values($orders), JSON_UNESCAPED_UNICODE);

header('Content-Type: application/json');
echo $json;

mysqli_free_result($result);
mysqli_close($conn);