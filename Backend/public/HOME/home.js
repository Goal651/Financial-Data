$(document).ready(function () {
    // $('#sidebar').hide();
    sidebar();
    //Get back to top button
    // let backToTop = document.getElementById("back-to-top-btn");

    // When the user scrolls down 20px from the top of the document, show the button
    // window.onscroll = function () {
    //     scrollFunction();
    // };

    // //This is the function to show that button
    // function scrollFunction() {
    //     if (document.body.scrollTop < 20 || document.documentElement.scrollTop > 20) {
    //         backToTop.style.display = "block";
    //     }
    //     else {
    //         backToTop.style.display = "none";
    //     }
    // }

    // let lastScrollTop = 0;

    // // $(window).scroll(function () {
    // //     var currentScroll = $(this).scrollTop();

    // //     if (currentScroll >= lastScrollTop) {
    // //         $('#header').hide();
    // //     } else {
    // //         $('#header').show();
    // //     }
    // //     lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    // // });

    // //To go back to top when that button clicked
    // $(backToTop).on("click", function () {
    //     document.body.scrollTop = 0;
    //     document.documentElement.scrollTop = 0;
    // });
});


//Codes for Search box
$('#searchInput').on('input', function () {
    const searchTerm = $(this).val().toUpperCase();
    let data = $('.linking');

    // Filter and display matching items
    data.each(function () {
        const text = $(this).text();
        const index = text.indexOf(searchTerm);

        if (index !== -1) {
            // Split the text into two parts: before and after the search term
            const before = text.substring(0, index);
            const after = text.substring(index + searchTerm.length);

            const highlightedText = before + "<span class='highlight'>" + text.substr(index, searchTerm.length) + "</span>" + after;
            $(this).html(highlightedText);
        }
    });
    searchTerm.toUpperCase();
});

//Dark mode functions 
// const toggleSwitch = document.getElementById('darkModeToggle');
// toggleSwitch.addEventListener('change', switchTheme);

// function switchTheme() {
//     if (toggleSwitch.checked) {
//         document.body.classList.add('dark-mode');
//     } else {
//         document.body.classList.remove('dark-mode');
//     }
// }


//Side bar function
function sidebar() {
    const sidebarbtn = $('#side-bar');
    const sidebar = $('#sidebar');

    $(sidebarbtn).on('click', function () {
        if ($(sidebar).css('visibility') === 'hidden') {
            $(sidebar).css('visibility', 'visible');
        } else {
            $(sidebar).css('visibility', 'hidden');
        }
    });
}

function logOut() {
    $('#popupH1').append('Attention')
    $('#popupP').append('Are you sure you ?');

    openPopup();
    image.src = '/icons/alert.png';
    $('button').on('click', () => {
        $('#popupH1').empty();
        $('#popupP').empty();
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: 'http://localhost:6510/logout',
            success: function () {
                window.location.href = '/';
            },
            error: function () {

                $('#popupH1').append('Error ')
                $('#popupP').append('Failed');

                openPopup();
                image.src = '/icons/error.png';
                $(image).css({ 'border-radius': '50%' });
            }
        });
    })

}
// Get the input and content elements
const searchInput = document.getElementById('searchInput');
const contentElements = document.getElementsByClassName('linking');
const contentText = Array.from(contentElements).reduce((text, element) => text + element.textContent, '').toLowerCase();

// Add an event listener to the input field
searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    // Find the index of the search term in the content
    const index = contentText.indexOf(searchTerm);

    if (index !== -1) {
        // Scroll to the position of the search term
        contentText.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});





//popup
let popup = document.getElementById('pop-up');

function openPopup() {
    $('#home').hide();
    $('#header').hide();
    $('#sidebar').hide();
    $('footer').hide();
    $('h1').hide();
    $('body').css({
        'background': 'linear-gradient(to right,rgb(6, 84, 180),blue,rgb(51, 0, 128))'
    });
    popup.classList.add('open-popup');
}

