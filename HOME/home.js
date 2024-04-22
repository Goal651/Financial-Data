$(document).ready(function () {
    $('.sidebar').hide();
    //Get back to top button
    let backToTop = document.getElementById("back-to-top-btn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction();
    };

    //This is the function to show that button
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTop.style.display = "block";
        }
        else {
            backToTop.style.display = "none";
        }
    }

    let lastScrollTop = 0;

    $(window).scroll(function () {
        var currentScroll = $(this).scrollTop();

        if (currentScroll >= lastScrollTop) {
            $('#header').hide();
        } else {
            $('#header').show();
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    //To go back to top when that button clicked
    $(backToTop).on("click", function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
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
const toggleSwitch = document.getElementById('darkModeToggle');
toggleSwitch.addEventListener('change', switchTheme);

// function switchTheme() {
//     if (toggleSwitch.checked) {
//         document.body.classList.add('dark-mode');
//     } else {
//         document.body.classList.remove('dark-mode');
//     }
// }


//Side bar function
const sidebarbtn = document.getElementById('side-bar');
const sidebar = document.getElementById('sidebar');
const html = document.getElementsByTagName('html');
sidebarbtn.addEventListener('click', function () {
    if (sidebar.style.display === 'none') {
        sidebar.style.display = 'block';
    } else {
        sidebar.style.display = 'none';
    }
});
html.addEventListener('click', function () {
    if (sidebar.style.display == 'block') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'none';
    }
});

function logOut() {
    alert('Logging out .....');
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://localhost:6510/logout/',
        success: function (response) {
            window.location.href = "/index.html"
        },
        error: function () {
            console.error("Unable to load students");
        }
    });
}







