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
switch ( $method ) {
    case 'POST' :
    $sales = $_POST[ 'sales' ];
    $net_sales = $_POST[ 'net_sales' ];
    $costOfGoods = $_POST[ 'costOfGoods' ];
    $grossProfit = $_POST[ 'grossProfit' ];
    $operatingExpense = $_POST[ 'operatingExpense' ];
    $netIncomeFromOperation = $_POST[ 'netIncomeFromOperation' ];
    $otherIncome = $_POST[ 'otherIncome' ];
    $otherExpense = $_POST[ 'otherExpense' ];
    $earningBeforeIncomeTax = $_POST[ 'earningBeforeIncomeTax' ];
    $incomeTAx = $_POST[ 'incomeTAx' ];
    $netIncome = $_POST[ 'netIncome' ];
    $conn->query( "INSERT INTO income (`sales`, `net sales`, `cost of goods`, `gross profit`, `operating expense`, `net income from operation`, `other income`, `other expense`, `earning before income tax`, `income tax`, `net income`)
     VALUES ('$sales', '$net_sales', '$costOfGoods', '$grossProfit',' $operatingExpense','$netIncomeFromOperation','$otherIncome',' $otherExpense',' $earningBeforeIncomeTax','$incomeTAx','$netIncome')" );
    echo json_encode( array( 'status' => 'success' ) );
    break;

    case 'PUT':
    // Update student details
    parse_str( file_get_contents( 'php://input' ), $_PUT );
    $id = $_PUT[ 'id' ];
    $firstName = $_PUT[ 'firstName' ];
    $lastName = $_PUT[ 'lastName' ];
    $email = $_PUT[ 'email' ];
    $password = $_PUT[ 'password' ];
    $conn->query( "UPDATE sign SET firstName='$firstName', lastName='$lastName', email='$email', password='$password' WHERE id=$id" );
    echo json_encode( array( 'status' => 'success' ) );
    break;
    case  'GET':
    $result = $conn->query( 'SELECT * FROM sign' );
    $students = array();
    while ( $row = $result->fetch_assoc() ) {
        $students[] = $row;
    }
    echo json_encode( $students );
    break;
    case 'DELETE':
    parse_str( file_get_contents( 'php://input' ), $_DELETE );
    $id = $_DELETE[ 'id' ];
    $conn->query( "DELETE FROM sign WHERE id=$id" );
    echo json_encode( array( 'status' => 'success' ) );
    break;
}
$conn->close();
?>
