<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $recaptchaSecret = "6Lca0aUrAAAAAMlSZg_Hdtnv3Z-JRXlTE6XBGa5Z";
    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

    // reCAPTCHA
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaResponse}");
    $captchaSuccess = json_decode($verify);

    if (!$captchaSuccess->success) {
        echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        exit;
    }

    // Form data
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $work = $_POST['work_responsibilities'] ?? '';
    $improvements = $_POST['improvements'] ?? [];
    $other1 = $_POST['other_text_1'] ?? '';
    $other2 = $_POST['other_text_2'] ?? '';

    $improvementsText = is_array($improvements) ? implode(", ", $improvements) : $improvements;

    // -------- Main email --------
    $emailBody = "New contact form submission:\n\n";
    $emailBody .= "Name: $name\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Phone: $phone\n";
    $emailBody .= "Work responsibilities: $work\n\n";
    $emailBody .= "Areas to improve: " . ($improvementsText ?: "None") . "\n";
    if ($other1) $emailBody .= "Other 1 detail: $other1\n";
    if ($other2) $emailBody .= "Other 2 detail: $other2\n";

    $headers = "From: info@keepfarmingon.ie\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $to = "info@keepfarmingon.ie";
    $subject = "New contact from website";

    $sentMain = mail($to, $subject, $emailBody, $headers);

    // -------- Notification email --------
    $toNotification = "keepfarmingonireland@gmail.com";
    $subjectNotification = "New website contact received";
    $messageNotification = "A new contact form submission has been received.\n\n".
                       "Please check info@keepfarmingon.ie for the full message.";

    $headersNotification = "From: info@keepfarmingon.ie\r\n";
    $headersNotification .= "MIME-Version: 1.0\r\n";
    $headersNotification .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $sentNotification = mail($toNotification, $subjectNotification, $messageNotification, $headersNotification);

    // -------- Response to frontend --------
    if ($sentMain) {
        echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error sending the email.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
}
?>