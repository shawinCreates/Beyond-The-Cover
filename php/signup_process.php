<?php
include 'db_config.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = trim($_POST["fullname"]);
    $email = trim($_POST["email"]);
    $username = trim($_POST["username"]);
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];

    if ($password !== $confirm_password) {
        die("Error: Passwords do not match.");
    }

    // Check if email or username already exists
    $check_sql = "SELECT * FROM users WHERE email=? OR username=?";
    $stmt = $conn->prepare($check_sql);
    $stmt->bind_param("ss", $email, $username);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        die("Error: Email or Username already registered.");
    }

    // Insert user
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $insert_sql = "INSERT INTO users (fullname, email, username, password) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($insert_sql);
    $stmt->bind_param("ssss", $fullname, $email, $username, $hashed_password);
    if ($stmt->execute()) {
        echo "Signup successful. <a href='login.html'>Login here</a>";
    } else {
        echo "Error: Could not create account.";
    }

    $stmt->close();
    $conn->close();
}
?>
