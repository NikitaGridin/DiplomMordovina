<?php
include './conn.php'; 
include './headers.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $page = isset($_GET['page']) ? $_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? $_GET['limit'] : 8;
        $offset = ($page - 1) * $limit;
        $category = isset($_GET['category']) ? $_GET['category'] : '';
        $sort = isset($_GET['sort']) ? $_GET['sort'] : '';
        $order = isset($_GET['order']) ? $_GET['order'] : '';

        $queryCount = "SELECT COUNT(*) as count FROM product";

        if ($category) {
            $queryCount .= " WHERE categoryId='$category'";
        }

        $countResult = mysqli_query($conn, $queryCount);
        $countRow = mysqli_fetch_assoc($countResult);
        $count = $countRow['count'];

        $pages = ceil($count / $limit);

        $query = "SELECT * FROM product";
        
        if ($category) {
            $query .= " WHERE categoryId='$category'";
        }
    
       
            $query .= " ORDER BY id DESC";
     
    
        $query .= " LIMIT $limit OFFSET $offset";
    
        $result = mysqli_query($conn, $query);
        if (mysqli_num_rows($result) > 0) {
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) $data[] = $row;
            $response = [
                'data' => $data,
                'pages' => $pages
            ];
            echo json_encode($response);
        } else {
            http_response_code(404);
            echo json_encode('Блюда данной категории времено отсутсвуют!');
        }
        break;

        case 'POST':         
            if (!isset($_POST['name'], $_POST['ccal'], $_POST['carbs'], $_POST['price'], $_POST['category_id'], $_POST['info'], $_FILES['img']) || !isset($_POST['protein']) || !isset($_POST['tallow']) || !isset($_POST['wt'])) {
                http_response_code(400);
                echo json_encode('Заполните все поля!');
                exit;
            }
        
            $name = $_POST['name'];
            $ccal = $_POST['ccal'];
            $carbs = $_POST['carbs'];
            $price = $_POST['price'];
            $categoryId = $_POST['category_id'];
            $info = $_POST['info'];
            $protein = $_POST['protein'];
            $tallow = $_POST['tallow'];
            $wt = $_POST['wt'];
            $img = $_FILES['img'];      
        
            $allowed_formats = array('jpg', 'jpeg', 'png');
            $img_name = $_FILES['img']['name'];
            $img_info = pathinfo($img_name);
            if(!in_array($img_info['extension'], $allowed_formats)) {
                http_response_code(400);
                echo json_encode('Можно загружать только фотогрфии!');
                exit;
            }
        
            $img_name = uniqid() . '.' . $img_info['extension'];
            $img_path = "./img_product/$img_name";
                
            $query = "INSERT INTO `product` (`id`, `name`, `img`, `ccal`, `protein`, `tallow`, `carbs`, `price`, `info`, `categoryId`, `wt`) VALUES (NULL, '$name', '$img_path', '$ccal', '$protein', '$tallow', '$carbs', '$price', '$info', '$categoryId','$wt')";
            $result = mysqli_query($conn, $query);
        
            if ($result) {
                move_uploaded_file($_FILES['img']['tmp_name'], $img_path);
                http_response_code(200);
                echo json_encode('Продукт добавлен!');
            } else {
                http_response_code(400);
                echo json_encode('Что то пошло не так, повторите попытку позже!');
            }

            break;
            
                case 'DELETE':
                if(!isset($_GET['id'])) {
                    http_response_code(400);
                    echo json_encode('Укажите ID блюда!');
                    exit;
                }
            
                $id = $_GET['id'];
                $query = "SELECT img FROM product WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if(mysqli_num_rows($result) == 0) {
                    http_response_code(404);
                    echo json_encode('Продукт не найден!');
                    exit;
                }
            
                $row = mysqli_fetch_assoc($result);
                $img = $row['img'];
            
                $query = "DELETE FROM product WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if ($result) {
                    if (!empty($img)) {
                        $img_path = $img;
                        if (file_exists($img_path)) unlink($img_path);
                    }
                    http_response_code(200);
                    echo json_encode('Продукт успешно удалёно!');
                } else {
                    http_response_code(400);
                    echo json_encode('Что-то пошло не так, повторите попытку позже!');
                }
                break;
    }

?>