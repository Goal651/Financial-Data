document.addEventListener("DOMContentLoaded", function () {
    var mybutton = document.getElementById("back-to-top-btn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", function () {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});
$(document).ready(function () {
    // $('#add').on('click',function(event) {
    //     event.preventDefault();
    //     add();
    // })
    $("#btn").on('click', function (event) {
        event.preventDefault();
        addBudget();

    });

});
function addBudget() {
    let form = {
        exp: $('#exp').val(),
        expam: $('#expam').val(),
        inc: $('#inc').val(),
        incam: $('#incam').val(),exp: $('#exp').val(),
        expam: $('#expam').val(),
        inc: $('#inc').val(),
        incam: $('#incam').val(),exp: $('#exp').val(),
        expam: $('#expam').val(),
        inc: $('#inc').val(),
        incam: $('#incam').val(),exp: $('#exp').val(),
        expam: $('#expam').val(),
        inc: $('#inc').val(),
        incam: $('#incam').val(),exp: $('#exp').val(),
        expam: $('#expam').val(),
        inc: $('#inc').val(),
        incam: $('#incam').val(),
        


    };
    $.post({
        url: 'income.php',
        data: form,
    }
    );


};
function add() {
    let net_sales = parseFloat($('#net_sales').val());
    let sales = parseFloat($('#sales').val());
    let costOfGoods = parseFloat($('#costOfGoods').val());
    let grossProfit = parseFloat($('#grossProfit').val());
    let operatingExpenses = parseFloat($('#operatingExpenses').val());
    let netIncomeFromOperations = parseFloat($('#netIncomeFromOperations').val());
    let otherIncome = parseFloat($('#otherIncome').val());
    let otherExpenses = parseFloat($('#otherExpenses').val());
    let earningBeforeIncomeTax = parseFloat($('#earningBeforeIncomeTax').val());
    let incomeTax = parseFloat($('#incomeTax').val());
    let netIncome = parseFloat($('#netIncome').val());
    let total = sales + net_sales + costOfGoods + grossProfit + operatingExpenses + netIncomeFromOperations + otherIncome + otherExpenses + earningBeforeIncomeTax + incomeTax + netIncome;

    document.getElementById('total').innerHTML = total;
}
