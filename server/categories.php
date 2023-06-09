<?php
include './conn.php'; 
include './headers.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
            $query = "SELECT * FROM categories";
    
            $result = mysqli_query($conn, $query);
            if (mysqli_num_rows($result) > 0) {
                $data = array();
                while ($row = mysqli_fetch_assoc($result)) $data[] = $row;
                echo json_encode($data);
        } else {
            http_response_code(404);
            echo json_encode([]);
        }
        break;

        case 'POST':         
            $data = json_decode(file_get_contents('php://input'), true);
if (empty($data['name'])) {
    http_response_code(400);
    echo json_encode(array('error' => true, 'message' => 'Заполните все поля!'));
    exit;
}
$name = $data['name'];
$query = "INSERT INTO `categories` (`name`) VALUES ('$name')";
$result = mysqli_query($conn, $query);
if ($result) {
    http_response_code(200);
    echo json_encode(array('error' => false, 'message' => 'Категория добавлена!'));
} else {
    http_response_code(400);
    echo json_encode(array('error' => true, 'message' => 'Что-то пошло не так, повторите попытку позже!'));
}
        break;

            case 'DELETE':
                if(!isset($_GET['id'])) {
                    http_response_code(400);
                    echo json_encode('Укажите ID категории!');
                    exit;
                }
            
                $id = $_GET['id'];
                $query = "SELECT * FROM categories WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if(mysqli_num_rows($result) == 0) {
                    http_response_code(404);
                    echo json_encode('Категория не найдена!');
                    exit;
                }
            
                $query = "DELETE FROM categories WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if ($result) {
                    http_response_code(200);
                    echo json_encode('Категория успешно удалёна!');
                } else {
                    http_response_code(400);
                    echo json_encode('Что-то пошло не так, повторите попытку позже!');
                }
                break;
    }

?>