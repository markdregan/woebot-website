<?php if ( !isset( $_SESSION ) ) session_start();

if ( !$_POST ) exit;

if ( !defined( "PHP_EOL" ) ) define( "PHP_EOL", "\r\n" );

//// Place your e-mail here

$address = "sandthemes@gmail.com";


//// Don't edit :)

$postValues = array();
foreach ( $_POST as $name => $value ) {
	$postValues[$name] = trim( $value );
}
extract( $postValues );

//// Important

$posted_verify = isset( $postValues['verify'] ) ? md5( $postValues['verify'] ) : '';
$session_verify = !empty($_SESSION['sand']['ajax-contact']['verify']) ? $_SESSION['sand']['ajax-contact']['verify'] : '';

$error = '';



//// Process for validation

//// Name validation
if ( empty( $name ) ) {
	$error .= '<li>Your name is required.</li>';
}

//// Subject validation
if ( empty( $subject ) ) {
	$error .= '<li>Subject is required.</li>';
}

//// E-mail validation
if ( empty( $email ) ) {
	$error .= '<li>Your e-mail address is required.</li>';
} elseif ( !isEmail( $email ) ) {
	$error .= '<li>You have entered an invalid e-mail address.</li>';
}

//// Message validation
if ( empty( $comments ) ) {
	$error .= '<li>You must enter a message to send.</li>';
}


//// Place your e-mail here

if ( !empty($error) ) {
	echo '<div class="errorMessage">Corect the errors and try again!';
	echo '<ul class="errorMessages">' . $error . '</ul>';
	echo '</div>';

	return false;

}

//// E-mail subject
$e_subject = "$subject ";

//// E-mail content
//// Starting with "You have been contacted by name"
//// Then MESSAGE field
//// Ending with You can contact name via e-mail, his email.
$msg  = "You have been contacted by $name" . PHP_EOL . PHP_EOL;
$msg .= $comments . PHP_EOL . PHP_EOL;
$msg .= "You can contact $name via e-mail, $email" . PHP_EOL . PHP_EOL;

$msg = wordwrap( $msg, 70 );

$headers  = "From: $email" . PHP_EOL;
$headers .= "Reply-To: $email" . PHP_EOL;


//// If message success, sent succesfully

if ( mail( $address, $e_subject, $msg, $headers ) ) {

	echo "<fieldset>";
	echo "<div class='successPage'>";
	echo "<h1>Your email was sent!</h1>";
	echo "<p>Thank you <strong>$name</strong>, your message has been submitted to us.</p>";
	echo "</div>";
	echo "</fieldset>";

	return false;

}


//// Don't edit here :)
echo 'ERROR! Please confirm PHP mail() is enabled.';
return false;


// E-mail character validation

function isEmail( $email ) { 

	return preg_match( "/^[-_.[:alnum:]]+@((([[:alnum:]]|[[:alnum:]][[:alnum:]-]*[[:alnum:]])\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i", $email );

}
?>
