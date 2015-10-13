<?php

if (isset($_POST)) {

	$fname = $_POST['firstname'];
	$lname = $_POST['lastname'];
	$email = $_POST['email'];

	$clearance = 0;

	//Validate Requireds
	$reqs = Array($fname, $lname, $email);
	foreach( $reqs as $r ) {
		$clearance += (required($r)) ? 0 : 1;
	}
	//Validate Email
	$clearance += (email($email)) ? 0 : 1;

	//Check Validation & Send Email
	if ($clearance !== 0) {
	/* submission invalidation */

		/* error-handling */
		echo "failure:validation";

	} else {
	/* submission clear */

		// $address = "contact@liveatbishopsplace.com";
		if ($_SERVER['HTTP_HOST'] === "primaryman.com") $address = "mitchell@primarydesign.com";
		else $address = "mdfragala@gmail.com";
		$subject = "User Email Submission";
		$message = "Landing Page User Submission:\n";
		$message .= "Name: " . $fname . "\n";
		$message .= "Phone: " . $lname . "\n";
		$message .= "Email: " . $email . "\n";

		if( mail($address, $subject, $message) ) {
			echo "success";
			echo $_SERVER['HTTP_HOST'];
		} else {
			echo "failure:mailing";
		}

	}/**(submission)**/
}
//GENERAL GLOBAL DECLARATIONS
function required($x) {
	if ($x !== "") return true;
	else return false;
}
function email($x) {
	$rgx = '/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([.][a-zA-Z]+)+$/';
	$val = preg_match($rgx,$x);
	return ($val === 1) ? true : false;
}
function phone($x) {
	$rgx = '/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/';
	$val = preg_match($rgx,$x);
	return ($val === 1) ? true : false;
}

?>
