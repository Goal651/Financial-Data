$(document).ready(function () {
    $('#feedback').append('');
    let originalData; // Variable to store the original fetched data
    let currentPage = 1; // Variable to track the current page

    //Delete Selected 
    $('#delete').on('click', deleteChecked);

    //Delete All
    $('#deleteAll').on('click', deleteAll);
    load(); // Load the data initially

    $('#searchInput').on('input', function () {
        const searchTerm = $(this).val().toLowerCase();

        // Check if originalData is initialized
        if (!Array.isArray(originalData)) {
            return;
        }

        // Clear previous results
        $('#list').empty();
        $('#feedback').innerHTML = 'No result Found';

        // Filter and display matching items from the original data
        const filteredData = originalData.filter(item => {
            return (
                item._id.toString().toLowerCase().includes(searchTerm) ||
                item.username.toLowerCase().includes(searchTerm) ||
                item.email.toLowerCase().includes(searchTerm) ||
                item.password.toLowerCase().includes(searchTerm)
            );
        });

        // Display filtered data starting from page 1
        currentPage = 1;
        displayData(filteredData, currentPage);
    });


    $('#list').on('click', '#edit', function () {
        const id = $(this).closest('tr').find('input[type="checkbox"]').data('id');
        edit(id);
    });

    $('#list').on('click', '#delete', function () {
        const id = $(this).closest('tr').find('input[type="checkbox"]').data('id');
        del(id);
    });



    function load() {
        $("form").hide();
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: 'http://localhost:6510/api/getUsers',
            success: function (result) {
                originalData = result.users; // Save the original fetched data
                displayData(result.users, 1); // Display the fetched data initially on page 1
            },
            error: function () {
                console.error("Unable to load students");
            }
        });
    }

    function displayData(data, page) {
        const itemsPerPage = 8;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);

        // Clear previous data
        $('#list').empty();

        // Display the data on the page
        pageData.forEach(item => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
            <td><input data-id="${item._id}" class="checked" type="checkbox"></td>
            <td>${item._id}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
            <td>${item.password}</td>
            <td><button id="edit" onclick="edit(${item._id})">Edit</button></td>
            <td><button id="delete" onclick="del(${item._id})">Delete</button></td>`;
            $('#list').append(tr);
        });

        // Generate pagination buttons
        generatePaginationButtons(data.length);
    }


    function generatePaginationButtons(dataLength) {
        const itemsPerPage = 5;
        const totalPages = Math.ceil(dataLength / itemsPerPage);
        const paginationContainer = $('#pagination').empty();

        // Previous button
        const prevButton = $('<button>').text('Previous').on('click', function () {
            if (currentPage > 1) {
                currentPage--;
                displayData(originalData, currentPage);
            }
        }).prop('disabled', currentPage === 1);
        paginationContainer.append(prevButton);

        // Page buttons
        for (let i = 1; i <= totalPages; i++) {
            const button = $('<button>').text(i).on('click', function () {
                currentPage = i;
                displayData(originalData, currentPage);
            });
            paginationContainer.append(button);
        }

        // Next button
        const nextButton = $('<button>').text('Next').on('click', function () {
            if (currentPage < totalPages) {
                currentPage++;
                displayData(originalData, currentPage);
            }
        }).prop('disabled', currentPage === totalPages);
        paginationContainer.append(nextButton);
    }

    //Function of deleting user
    function del(id) {
        $.ajax({
            type: "delete",
            url: "http://localhost:6510/delete",
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
        $("form").show();
        $.ajax({
            type: "get",
            url: "admin.php",
            data: { id: id },

            success: function (student) {
                $('#ida').val(student.id),
                    $('#username').val(student.username),
                    $('#email').val(student.email),
                    $('#password').val(student.password),
                    $('#addForm').off('click').on('click', function (event) {
                        event.preventDefault();
                        update(id);
                        load();
                    });
            },
            error: function () {
                console.log("Failed to get the student")
            }
        });
    }

    function update(id) {
        let ida = $('#ida').val();
        let username = $('#username').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let lastName = $('#lastName').val();
        $.ajax({
            type: "put",
            url: "",
            data: {
                id: id,
                ida: ida,
                username: username,
                email: email,
                password: password,
            },

            success: function () {
                $('#username').val('');
                $('#email').val('');
                $('#password').val('');
                load();
            },
            error: function (error) {
                console.error('failed to update student', error)
            }
        })
        $("form").hide();
    }

    //TO CHECK ALL CHECKBOXES
    $('#how').on('click', checkAll);
    function checkAll() {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = document.getElementById('how').checked;

        });
    }
    // To delete checked boxes and the data

    function deleteChecked() {
        $('input[type="checkbox"]:checked').each(function () {
            let id = $(this).data('id'); // Retrieve student ID from data attribute
            delet(id); // Call delet function with the retrieved student ID
        });
    }



    //DELETING ALL DATA IN THE DATA

    function deleteAll() {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = true;
        });

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                let id = checkbox.dataset.id;

                delet(id);

            }
        })

    };

});










