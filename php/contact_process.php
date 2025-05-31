<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate inputs
    $firstName = trim($_POST["firstName"]);
    $lastName = trim($_POST["lastName"]);
    $email = trim($_POST["email"]);
    $phone = trim($_POST["phone"]);
    $message = trim($_POST["message"]);
    $termsCheck = isset($_POST["termsCheck"]);

    // Check required fields
    if (empty($firstName) || empty($email) || empty($message) || !$termsCheck) {
        echo "Please fill out all required fields and agree to the terms.";
        exit();
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit();
    }

    // Prepare email content
    $to = "iamshawin@gmail.com";
    $subject = "New Contact Form Submission";
    $body = "You have received a new message from Beyond The Cover contact form.\n\n";
    $body .= "First Name: $firstName\n";
    $body .= "Last Name: $lastName\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Message:\n$message\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for contacting us! Your message has been sent successfully.";
        header("Location: ../contact.html"); // Redirect back to the contact page
        exit();
    } else {
        echo "Sorry, there was an error sending your message. Please try again later.";
    }
}
?>