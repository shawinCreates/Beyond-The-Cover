<?php
include 'db_config.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $authorName = trim($_POST["authorName"]);
    $email = trim($_POST["email"]);
    $storyTitle = trim($_POST["storyTitle"]);
    $synopsis = trim($_POST["synopsis"]);
    $genre = $_POST["genre"];
    $termsCheck = isset($_POST["termsCheck"]);
    $conditionsCheck = isset($_POST["conditionsCheck"]);

    // Check required fields
    if (empty($authorName) || empty($email) || empty($storyTitle) || empty($synopsis) || empty($genre) || !$termsCheck || !$conditionsCheck) {
        echo "Please fill out all required fields and agree to the terms.";
        exit();
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit();
    }

    // Handle file upload
    if (isset($_FILES["storyFile"]) && $_FILES["storyFile"]["error"] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES["storyFile"]["tmp_name"];
        $fileName = $_FILES["storyFile"]["name"];
        $fileSize = $_FILES["storyFile"]["size"];
        $fileType = $_FILES["storyFile"]["type"];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // Validate file type and size
        $allowedExtensions = ["docx", "pdf"];
        if (!in_array($fileExtension, $allowedExtensions)) {
            echo "Invalid file type. Only .docx and .pdf files are allowed.";
            exit();
        }
        if ($fileSize > 5 * 1024 * 1024) { // 5 MB limit
            echo "File size exceeds the limit of 5 MB.";
            exit();
        }

        // Move file to uploads directory
        $uploadDir = "../uploads/";
        $newFileName = uniqid() . "." . $fileExtension;
        $uploadFilePath = $uploadDir . $newFileName;

        if (!move_uploaded_file($fileTmpPath, $uploadFilePath)) {
            echo "Error uploading file.";
            exit();
        }
    } else {
        echo "File upload failed.";
        exit();
    }

    // Insert data into the database
    $sql = "INSERT INTO story_submissions (author_name, email, story_title, synopsis, genre, file_path) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $authorName, $email, $storyTitle, $synopsis, $genre, $uploadFilePath);

    if ($stmt->execute()) {
        echo "Thank you for submitting your story! Your story has been saved successfully.";
        header("Location: ../submit.html"); // Redirect back to the submit page
        exit();
    } else {
        echo "Sorry, there was an error saving your story. Please try again later.";
    }

    $stmt->close();
    $conn->close();
}
?>