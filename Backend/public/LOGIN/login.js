$(document).ready(function () {
    $('.container').append('');
    $('.message').show();

    $("form").on('submit', function (e) {
        e.preventDefault();

        let email = $("#email").val();
        let password = $("#password").val();
        let image = document.getElementById('image');
        let data = {
            email: email,
            password: password
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:6510/api/checkUsers",
            data: data,
            dataType: "json",

            success: function () {
                $('#popupH1').append('Welcome')
                $('#popupP').append('Thank You');

                openPopup();
                image.src = '/icons/che.jpeg';
                $(image).css({ 'border-radius': '50%' });
                $('button').on('click', () => {
                    window.location.href = "/HOME/home.html";
                })
            }

            ,
            error: function (xhr, status, error) {
                if (xhr.status === 404) {

                    $('#popupH1').append('Error')
                    $('#popupP').append('Account does not Exist');
                    openPopup();
                    $('button').on('click', () => {
                        closePopup();
                    })
                    image.src = '/icons/error.png';
                }
                
                else if (xhr.status === 401) {

                    const input = $('#password');
                    input.css({ 'position': 'relative', 'border-color': 'red' });
                    const distance = 10;
                    const speed = 75;

                    input.animate({
                        left: `-${distance}px`
                    }, speed)
                        .animate({
                        left: `${distance}px`
                    }, speed)
                      .animate({
                        left: `0px`
                         }, speed)
                        .focus(); // Return focus to the input
                } else {

                }
            }

        });
    });

});

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
    $.ajax({
        type: "GET",
        url: "http://localhost:6510/login",
        dataType: "json",
        success: function () {
            console.log('Users sent');
        }
    });
    popup.classList.remove('open-popup');
}




