<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $recaptchaSecret = "6Lca0aUrAAAAAMlSZg_Hdtnv3Z-JRXlTE6XBGa5Z";
    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

    // Verificación de reCAPTCHA
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaResponse}");
    $captchaSuccess = json_decode($verify);

    if (!$captchaSuccess->success) {
        echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        exit;
    }

    // Recoger datos del formulario
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $work = $_POST['work_responsibilities'] ?? '';
    $improvements = $_POST['improvements'] ?? [];
    $other1 = $_POST['other_text_1'] ?? '';
    $other2 = $_POST['other_text_2'] ?? '';

    $improvementsText = is_array($improvements) ? implode(", ", $improvements) : $improvements;
    // Crear el cuerpo del correo
    $emailBody = "New contact form submission:\n\n";
    $emailBody .= "Name: $name\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Phone: $phone\n";
    $emailBody .= "Work responsibilities: $work\n\n";
    $emailBody .= "Areas to improve: " . ($improvementsText ?: "None") . "\n";
    if ($other1) $emailBody .= "Other 1 detail: $other1\n";
    if ($other2) $emailBody .= "Other 2 detail: $other2\n";

    // Cabeceras
    $headers = "From: info@keepfarmingon.ie\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $to = "info@keepfarmingon.ie";
    $subject = "New contact from website";

    if (mail($to, $subject, $emailBody, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Correo enviado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al enviar el correo.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>