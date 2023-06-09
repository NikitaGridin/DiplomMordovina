<?php
// Параметры подключения к базе данных
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dip_mordovina";

// Создание подключения к базе данных
$conn = mysqli_connect($servername, $username, $password);

// Проверка подключения к базе данных
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Создание базы данных
$sql_create_db = "CREATE DATABASE IF NOT EXISTS $dbname";
if (mysqli_query($conn, $sql_create_db)) {
    echo "Database created successfully\n";
} else {
    echo "Error creating database: " . mysqli_error($conn) . "\n";
}

// Переключение на базу данных
mysqli_select_db($conn, $dbname);

// Создание таблицы users
$sql_create_users = "CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  numberPhone VARCHAR(20) NOT NULL UNIQUE,
  role ENUM('user','admin') NOT NULL DEFAULT 'user'
)";
if (mysqli_query($conn, $sql_create_users)) {
    echo "Table users created successfully\n";
} else {
    echo "Error creating table: " . mysqli_error($conn) . "\n";
}

// Создание таблицы categories
$sql_create_categories = "CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
)";
if (mysqli_query($conn, $sql_create_categories)) {
    echo "Table categories created successfully\n";
} else {
    echo "Error creating table: " . mysqli_error($conn) . "\n";
}

// Создание таблицы product
$sql_create_product = "CREATE TABLE IF NOT EXISTS product (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  img VARCHAR(255),
  ccal INT,
  protein FLOAT,
  tallow FLOAT,
  carbs FLOAT,
  price INT,
  wt INT,
  info TEXT,
  categoryId INT,
  FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE,
)";
if (mysqli_query($conn, $sql_create_product)) {
    echo "Table product created successfully\n";
} else {
    echo "Error creating table: " . mysqli_error($conn) . "\n";
}

// Создание таблицы orders
$sql_create_orders = "CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  allPrice INT NOT NULL,
  count INT NOT NULL,
  status ENUM('wait','good','bad') NOT NULL DEFAULT 'wait',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)";
if (mysqli_query($conn, $sql_create_orders)) {
    echo "Table orders created successfully\n";
} else {
    echo "Error creating table: " . mysqli_error($conn) . "\n";
}
// Создание таблицы orders
$sql_create_orders = "CREATE TABLE IF NOT EXISTS product_orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productId INT NOT NULL,
    orderId INT NOT NULL,
    count INT NOT NULL,
    FOREIGN KEY (productId) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE);";
if (mysqli_query($conn, $sql_create_orders)) {
    echo "Table orders created successfully\n";
} else {
    echo "Error creating table: " . mysqli_error($conn) . "\n";
}

// Создание таблицы user_order
$sql_create_user_order = "CREATE TABLE IF NOT EXISTS user_order (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  orderId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (orderId) REFERENCES orders(id)
  ON DELETE CASCADE
)";
if (mysqli_query($conn, $sql_create_user_order)) {
    echo "Table user_order created successfully\n";
} else {
    echo "Error creating table: " . mysqli_error($conn) . "\n";
}
 
// Закрытие соединения с базой данных
mysqli_close($conn);
?>