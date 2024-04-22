$(document).ready(function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        check();

        function check() {
            let email = $('#email').val();
            $.ajax({
                type: "post",
                url: "forgot.php",
                data: email,
                dataType: "json",
                success: function () {
                    alert('Success');

                },
                error: function () {
                    alert('Failes');
                }
            });
        }


    });
    
})