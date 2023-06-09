<?php
include './conn.php'; 
include './headers.php'; 

    if(empty($_POST['name']) || empty($_POST['surname']) || empty($_POST['numberPhone']) || empty($_POST['password'])) {
        http_response_code(400);
        echo json_encode(array('success' => false, 'message' => 'Заполните все поля!'), JSON_UNESCAPED_UNICODE);
        exit;
    }

    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $numberPhone = $_POST['numberPhone'];
    $password = $_POST['password'];

    $query = "SELECT * FROM users WHERE numberPhone='$numberPhone'";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result) > 0) {
        http_response_code(409);
        echo json_encode(array('success' => false, 'message' => 'Номер телефона занят!'), JSON_UNESCAPED_UNICODE);
        exit;
    }

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);  

    $query = "INSERT INTO `users` (`id`, `name`, `surname`, `numberPhone`,`password`, `role`) VALUES (NULL, '$name', '$surname', '$numberPhone', '$passwordHash', 'user')";
    $result = mysqli_query($conn, $query);

    if ($result) {
        http_response_code(200);
        echo json_encode(array('success' => true, 'message' => 'Регистрация прошла успешно!'), JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(400);
        echo json_encode(array('success' => false, 'message' => 'Ошибка при выполнении запроса: ' . mysqli_error($conn)), JSON_UNESCAPED_UNICODE);
    }

?>