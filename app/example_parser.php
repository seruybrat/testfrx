<?php
if( isset($_POST['fn']) && isset($_POST['ln']) && isset($_POST['ph']) ){
	$f = $_POST['fn']; // HINT: use preg_replace() to filter the data
	$l = $_POST['ln'];
	$p = $_POST['ph'];
	$e = $_POST['em'];
	
	$to = "sergii.bartkiv@gmail.com";	
	$from = $e;
	$subject = 'Contact Form Message';
	$message = '<b>First Name: </b> '.$f.' <b> Last Name: </b> '.$l.' <b> Phone: </b> '.$p.' <br><b> Email: </b> '.$e.' <p>'.$m.' </p>';
	$headers = "From: $from\n";
	$headers .= "MIME-Version: 1.0\n";
	$headers .= "Content-type: text/html; charset=iso-8859-1\n";
	if( mail($to, $subject, $message, $headers) ){
		echo "success";
	} else {
		echo "The server failed to send the message. Please try again later.";
	}
}
?>