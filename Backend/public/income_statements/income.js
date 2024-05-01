$(document).ready(function () {
    $('#add').on('click', function (event) {
        event.preventDefault();
        add();
    })
    $("#btn").on('click', function (event) {
        event.preventDefault();
        addStudent();

    });

});
function addStudent() {
    let form = {
        sales: $('#sales').val(),
        net_sales: $('#net_sales').val(),
        email: $('#email').val(),
        costOfGoods: $('#costOfGoods').val(),
        grossProfit: $('#grossProfit').val(),
        operatingExpenses: $('#operatingExpenses').val(),
        netIncomeFromOperations: $('#netIncomeFromOperations').val(),
        otherIncome: $('#otherIncome').val(),
        otherExpenses: $('#otherExpenses').val(),
        earningBeforeIncomeTax: $('#earningBeforeIncomeTax').val(),
        incomeTax: $('#incomeTax').val(),
        netIncome: $('#netIncome').val(),


    };
    $.post({
        url: 'income.php',
        data: form,
    }
    );


};

function add() {
    let input = $('.input').val();
    let goal = [input];
    let sum = 0;
    for (i = 0; i < goal.length; i++) {
        sum = + goal[i];
    }
    document.getElementById('total').innerHTML='sum';
    return sum;
}

//create a new table rows
function addRow() {
    let newrow = $('<tr>'); // Create a new <tr> element
    newrow.html(`
        <th>New VAlue</th>
        <td><input class="input" type="number"></td>
    `);
    $('#trow').before(newrow); // Append the new row before the empty row with id "trow"
}
