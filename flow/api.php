<?php

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$subject = $_POST['subject'];
$message = $_POST['message'];
    //echo json_encode(['status' => 'success', 'message' => 'Form submitted successfully.']);


//exit;
// Validate data (you can add more validation as needed)
if (empty($name) || empty($email) || empty($message)) {
    // Handle validation error
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
    exit;
}

// Email content
$mailContent = "Name: $name\n";
$mailContent .= "Email: $email\n";
$mailContent .= "Phone: $phone\n";
$mailContent .= "Subject: $subject\n\n";
$mailContent .= "Message:\n$message";

// Send email
$to = 'hi@sulata.com';  // Replace with your email address
$subject = subject;

$headers = 'From: ' . $email . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if (mail($to, $subject, $mailContent, $headers)) {
    echo json_encode(['status' => 'success', 'message' => '&check; Thank you, we will get back to you shortly!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error submitting the form.']);
}