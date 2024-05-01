$(document).ready(function () {
    $('form').on('submit', (e) => {
        e.preventDefault();
        addStudent();
    });
});


function addStudent() {
    let data = {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val()
    };

    $.ajax({
        type: 'post',
        url: 'http://localhost:6510/api/createUser',
        data: data,
        dataType: "json",
        success: function (response) {



            $('#popupH1').append('Welcome')
            $('#popupP').append('Thank You for registering to Financial data');
            $('button').on('click', () => {
                window.location.href = "/HOME/home.html"
            })
            openPopup();
            image.src = '/icons/che.jpeg';
            $(image).css({ 'border-radius': '50%' })


        },
        error: function (xhr) {
            if (xhr.status == 404) {

                    $('#popupH1').append('Error')
                    $('#popupP').append('Account Already Exist');
                    openPopup();
                    $('button').on('click', () => {
                        window.location.href = '/';
                    })
                    image.src = '/icons/error.png';

                

            }

        }
    });


}

//popup
let popup = document.getElementById('pop-up');
function openPopup() {
    $('.form').hide();
    $('body').css({
        'background': 'linear-gradient(to right,rgb(6, 84, 180),blue,rgb(51, 0, 128))'
    });
    popup.classList.add('open-popup');
}
function closePopup() {
    $('#popupP').empty();
    $('#popupH1').empty();
    $('.form').show();
    $('body').css({
        'background': 'lightcyan'
        ,
    });
    popup.classList.remove('open-popup');
}

document.getElementById('password').addEventListener('invalid', function (event) {
    event.target.setCustomValidity('Minimum password 4 ');
});