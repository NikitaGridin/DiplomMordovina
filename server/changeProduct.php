<?php
include './conn.php'; 
include './headers.php';


if (!isset($_POST['id'], $_POST['name'], $_POST['ccal'], $_POST['carbs'], $_POST['price'], $_POST['categoryId'], $_POST['info'], $_POST['protein'], $_POST['tallow'], $_POST['wt'])) {
    http_response_code(400);
    echo json_encode('Заполните все поля!');
    exit;
}


$id = $_POST['id'];
$name = $_POST['name'];
$ccal = $_POST['ccal'];
$carbs = $_POST['carbs'];
$price = $_POST['price'];
$categoryId = $_POST['categoryId'];
$info = $_POST['info'];
$protein = $_POST['protein'];
$tallow = $_POST['tallow'];
$wt = $_POST['wt'];

$query = "SELECT img FROM product WHERE id=$id";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) == 0) {
    http_response_code(404);
    echo json_encode('Блюдо не найдено!');
    exit;
}

if (isset($_FILES['image'])) {
    $allowed_formats = array('jpg', 'jpeg', 'png');
    $img_name = $_FILES['image']['name'];
    $img_info = pathinfo($img_name);
    if (!in_array($img_info['extension'], $allowed_formats)) {
        http_response_code(400);
        echo json_encode('Можно загружать только фотографии!');
        exit;
    }

    $img_name = uniqid() . '.' . $img_info['extension'];
    $img_path = "./img_product/$img_name";

    $query = "SELECT img FROM product WHERE id=$id";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    $old_img = $row['img'];
    $query = "UPDATE product SET name='$name', ccal='$ccal', carbs='$carbs', price='$price', categoryId='$categoryId', info='$info', protein='$protein', tallow='$tallow', wt='$wt', img='$img_path' WHERE id=$id";                
} else {
    $query = "UPDATE product SET name='$name', ccal='$ccal', carbs='$carbs', price='$price', categoryId='$categoryId', info='$info', protein='$protein', tallow='$tallow', wt='$wt' WHERE id=$id";
}

$result = mysqli_query($conn, $query);
if ($result) {
    if (isset($_FILES['image'])) {
        move_uploaded_file($_FILES['image']['tmp_name'], $img_path);

        if ($old_img != $img_name) {
            $old_img_path = $old_img;
            if (file_exists($old_img_path)) unlink($old_img_path);
        }
    }
    http_response_code(200);
    echo json_encode('Информация успешно обновлена!');
} else {
    http_response_code(400);
    echo json_encode('Что-то пошло не так, повторите попытку позже! Ошибка: ' . mysqli_error($conn));                
}
?>