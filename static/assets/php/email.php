<?php

mb_internal_encoding("UTF-8");

$to = 'artyom.fedotov93@example.com';
$subject = 'Message from Cryptex';

$name = "";
$email = "";
$phone = "";
$message = "";

if( isset($_POST['name']) ){
    $name = $_POST['name'];

    $body .= "Name: ";
    $body .= $name;
    $body .= "\n\n";
}
if( isset($_POST['subject']) ){
    $subject = $_POST['subject'];
}
if( isset($_POST['email']) ){
    $email = $_POST['email'];

    $body .= "";
    $body .= "Email: ";
    $body .= $email;
    $body .= "\n\n";
}
if( isset($_POST['phone']) ){
    $phone = $_POST['phone'];

    $body .= "";
    $body .= "Phone: ";
    $body .= $phone;
    $body .= "\n\n";
}
if( isset($_POST['message']) ){
    $message = $_POST['message'];

    $body .= "";
    $body .= "Message: ";
    $body .= $message;
    $body .= "\n\n";
}

$headers = 'From: ' .$email . "\r\n";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
mb_send_mail($to, $subject, $body, $headers);
    echo '<div class="status-icon valid"><i class="fa fa-check"></i></div>';
}
else{
    echo '<div class="status-icon invalid"><i class="fa fa-times"></i></div>';
}
//require_once 'swift/lib/swift_required.php';
//$nameValue = "";
//$emailValue = "";
//$phoneValue = "";
//$messageValue = "";
//$bodyText = "";
//
//$nameValue=$_GET["name"];
//$emailValue=$_GET["email"];
//$phoneValue=$_GET["phone"];
//$messageValue=$_GET["message"];
//
////#TODO don't forget to retrieve the values and merge it in the body
//$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
//    ->setUsername('artyom.fedotov.job@gmail.com')
//    ->setPassword('artyomfedotov');
//$mailer = Swift_Mailer::newInstance($transport);
//$message = Swift_Message::newInstance('Test Subject')
//    ->setFrom(array('artyom.fedotov.job@gmail.com' => 'repetitor_job'))
//    ->setTo(array('artyom.fedotov93@gmail.com'))
//    ->setBody('name: '        . $nameValue . ';' . '\n'
//                . 'email: '   . $emailValue  . ';' . '\n'
//                . 'phone: '   . $phoneValue . ';' . '\n'
//                . 'message: ' . $messageValue);
//
//$result = $mailer->send($message);
//if ($result) {
//    $new = $html->find(".status-icon valid");
//    if (!$new) {
//        echo '<div class="status-icon valid"><i class="fa fa-check"></i></div>';
//        sleep(3);
//        echo strip_tags('<div class="status-icon valid"><i class="fa fa-check"></i></div>');
//    }
//}
//else{
//    echo '<div class="status-icon invalid"><i class="fa fa-times"></i></div>';
//}

