<?php
include './conn.php';
include './headers.php';

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);
$userId = $data['userId'];
$productIds = $data['productIds'];

$count = count($productIds); 
$allPrice = 0; 
$status = "new"; 
$created_at = date("Y-m-d H:i:s"); 
$sql = "INSERT INTO orders (count, allPrice) VALUES ('$count', '$allPrice')";
if ($conn->query($sql) === TRUE) {
  $orderId = $conn->insert_id;
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
  exit();
}

foreach ($productIds as $product) {
  $productId = $product['id'];
  $productCount = $product['count'];
    $sql = "INSERT INTO product_orders (productId, orderId, count) VALUES ('$productId', '$orderId', '$productCount')";
    if ($conn->query($sql) !== TRUE) {
      echo "Error: " . $sql . "<br>" . $conn->error;
      exit();
    }

}

$sql = "INSERT INTO user_order (userId, orderId) VALUES ('$userId', '$orderId')";
if ($conn->query($sql) !== TRUE) {
  echo "Error: " . $sql . "<br>" . $conn->error;
  exit();
}

$sql = "SELECT SUM(p.price * po.count) AS total_price FROM product AS p INNER JOIN product_orders AS po ON p.id = po.productId WHERE po.orderId = '$orderId'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $allPrice = $row['total_price'];
  $sql = "UPDATE orders SET allPrice='$allPrice' WHERE id='$orderId'";
  if ($conn->query($sql) !== TRUE) {
    echo "Error: " . $sql . "<br>" . $conn->error;
    exit();
  }
}

$conn->close();
$response = array("orderId" => $orderId, "allPrice" => $allPrice);
echo json_encode($response);