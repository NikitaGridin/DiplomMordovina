<?php
include './conn.php'; 
include './headers.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        if(!empty($_GET['id'])){
            $userId = $_GET['id'];
            $query = "SELECT * FROM users WHERE id=$userId";
        }
        else{
            $query = "SELECT * FROM users";
        }
    
            $result = mysqli_query($conn, $query);
            if (mysqli_num_rows($result) > 0) {
                $data = array();
                while ($row = mysqli_fetch_assoc($result)) $data[] = $row;
                echo json_encode($data);
        } else {
            http_response_code(404);
            echo json_encode('Пользователей нет!');
        }
        break;
            case 'DELETE':
                if(!isset($_GET['id'])) {
                    http_response_code(400);
                    echo json_encode('Укажите ID пользователя!');
                    exit;
                }
            
                $id = $_GET['id'];
                $query = "SELECT * FROM users WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if(mysqli_num_rows($result) == 0) {
                    http_response_code(404);
                    echo json_encode('Пользователь не найден!');
                    exit;
                }
            
                $query = "DELETE FROM users WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if ($result) {
                    http_response_code(200);
                    echo json_encode('Пользователь успешно удалён!');
                } else {
                    http_response_code(400);
                    echo json_encode('Что-то пошло не так, повторите попытку позже!');
                }
                break;
    }

?>