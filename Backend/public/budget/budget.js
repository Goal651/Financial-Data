let editMode = false;
$(document).ready(function () {
    load();


    //open form
    $(".addBudget").on('click', function (event) {
        event.preventDefault();
        openForm();
    });


    //close form
    $("#closeForm").on('click', function (event) {
        event.preventDefault();
        closeForm();
    });


    //Sending data to backend
    $("form").on('submit', function (event) {
        event.preventDefault();

        if (editMode) {
            edit();
            update();
        } else {
            createBudget();
        }

    });


});


function openForm() {
    $('.container').css({ 'display': 'block' })
    $('header').hide();
    $('table').hide();
    $('h1').hide();
    $('.addBudget').hide();
    document.getElementById('container').classList.add('open-form')

}


function closeForm() {
    $('.container').css({ 'display': 'none' })
    $('header').show();
    $('table').show();
    $('h1').show();
    $('.addBudget').show();
    document.getElementById('container').classList.remove('open-form')
}

function createBudget() {
    const data = {
        type: $('#type').val(),
        currency: $('#Currency').val(),
        transaction: $('#Transaction').val(),
        amount: $('#Amount').val(),
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:6510/createBudget",
        data: data,
        dataType: "json",
        success: function () {
            load();
        },
        error: function (error) {

        }
    });
}

//Function load data on db
function load() {
    $.ajax({
        type: "GET",
        url: "http://localhost:6510/getBudgets",
        dataType: "json",
        success: function (response) {
            let data = response.budgets;
            displayData(data)
        }
    });
}

function displayData(data) {
    // Display the data on the page
    $('#expense').empty();
    $('#income').empty();
    data.forEach(item => {
        let tr = document.createElement('tr');
        if (item.type == 'Expense') {
            tr.innerHTML = `
            <td>${item.transaction}</td>
            <td>${item.amount}(${item.currency})</td>
            <td><button class='data-button'  id="edit" onclick="edit('${item._id}')">Edit</button></td>
            <td><button class='data-button' id="delete" onclick="del('${item._id}')">Delete</button></td>`;
            $('#expense').prepend(tr);

        }


        else if (item.type == 'Income') {
            tr.innerHTML = `
            <td>${item.transaction}</td>
            <td>${item.amount}(${item.currency})</td>
            <td><button class='data-button' id="edit" onclick="edit(${item._id})">Edit</button></td>
            <td><button class='data-button' id="delete" onclick="del('${item._id}')">Delete</button></td>`;
            $('#income').prepend(tr);
        }
    });
}


function del(id) {
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:6510/api/deleteBudget",
        data: { id: id },
        success: function () {
            load();
        },
        error: function () {
            console.error("Failed to delete student")
        }
    });
}

function edit(id) {

    openForm();
    $.ajax({
        type: "GET",
        url: `http://localhost:6510/getBudget/${id}`,
        success: function (result) {

            let data = result.budget;
            $('#type').val(data.type);
            $('#Currency').val(data.currency);
            $('#Transaction').val(data.transaction);
            $('#Amount').val(data.amount);
            editMode = true;
            update(data._id);

        },
        error: function () {
            console.log("Failed to get the Budget")
        }
    });
}

function update(id) {
    let data = {
        id: id,
        type: $('#type').val(),
        currency: $('#Currency').val(),
        transaction: $('#Transaction').val(),
        amount: $('#Amount').val(),
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:6510/api/editBudget`,
        data: data,
        success: function () {
            closeForm();
            load();
        },
        error: function (error) {
            console.error('failed to update budget', error)
        }
    })
}


