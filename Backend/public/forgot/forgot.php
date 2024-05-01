<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'financial_data';

$conn = new mysqli( $servername, $username, $password, $dbname );
if ( $conn->connect_error ) {
    die( 'Connection failed: ' . $conn->connect_error );
}
$server = $_SERVER[ 'REQUEST_METHOD' ];
$email = $_POST[ 'email' ];
$result = $conn->query( "SELECT username from sign where email='$email'" );
if ( $result->num_rows > 0 ) {
    echo json_encode( array( 'status'=>'failed' ) );
} else {
    $conn->query( "UPDATE sign SET  password='' WHERE email='$email' " );
    echo json_encode( array( 'status' => 'success' ) );
}

