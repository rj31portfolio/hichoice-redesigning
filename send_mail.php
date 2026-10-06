<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form values safely
    $name    = htmlspecialchars(trim($_POST['name']));
    $email   = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Your email where you want to receive messages
    $to = "info@hichoice.in";  // <-- CHANGE to your email address

    // Email contentx
    $body  = "You have received a new message from your website contact form.\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Subject: $subject\n";
    $body .= "Message:\n$message\n";

    // Headers
    $headers = "From: Website Contact <no-reply@yourdomain.com>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send mail
    if(mail($to, $subject, $body, $headers)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Sorry, your message could not be sent. Please try again later.";
    }
}
?>

