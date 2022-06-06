<?php 
    session_start(); 
    include "DBConnector.php";
    if (isset($_POST['username']) && isset($_POST['password'])) {
        function validate($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
    }

    $username = validate($_POST['username']);
    $password = validate($_POST['password']);

    if (empty($username)) {
        header("Location: ../HTML/login.php?error=Username is required");
        exit();
    } else if(empty($password)){
        header("Location: ../HTML/login.php?error=Password is required");
        exit();
    } else {
        $sql = "SELECT * FROM user WHERE LoginName='$username' AND Password='$password'";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) === 1) {
            $row = mysqli_fetch_assoc($result);
            if ($row['LoginName'] === $username && $row['Password'] === $password) {
                echo "Logged in!";
                $_SESSION['username'] = $row['username'];
                $_SESSION['name'] = $row['name'];
                $_SESSION['id'] = $row['id'];
                header("Location: ../HTML/index.html");
                exit();
            } else {
                header("Location: ../HTML/login.php?error=Incorect username or password");
                exit();
            }
        } else {
            header("Location: ../HTML/login.php?error=Incorect username or password");
            exit();
        }
    }
} else {
    header("Location: ../HTML/login.php");
    exit();
}

?>