<?php
$server = 'localhost';
// $servername = '127.0.0.1';
$username = 'root';
$password = '';
$db = 'financial_data';
$conn = new mysqli( $server, $username, $password, $db );
if ( $conn->connect_error ) {
    die( 'Connection failed: ' . $conn->connect_error );
}
header( 'Content-Type: application/json' );
$method = $_SERVER[ 'REQUEST_METHOD' ];
if ( $method == 'POST' ) {
    $username = $_POST[ 'username' ];
    $email = $_POST[ 'email' ];
    $password = $_POST[ 'password' ];
    $check_email = "SELECT*FROM sign WHERE email='$email' ";
    $result = $conn->query( $check_email );
    if ( $result->num_rows > 0 ) {
        echo json_encode( array( 'status'=>'failed', 'message'=>'Account already exist' ) );
    } else {
        if ( is_null($password) ) {
            echo json_encode( array( 'status'=>'null' ) );
        } else {
            if ( $conn->query( "INSERT INTO sign (`username`, `email`, `password`) VALUES ('$username', '$email', '$password')" ) === TRUE ) {
                echo json_encode( array( 'status' => 'okay' ) );
            } else {
                echo json_encode( array( 'status' => 'failed', 'message'=>'Error occured:'.$conn->error ) );

            }
        }
    }
}
$conn->close();
?>
