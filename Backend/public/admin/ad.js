$(document).ready( function (){
    $('#btn').on('click', function (e) {
        e.preventDefault();
        submita();
    });
//Check  the username and password 
    function submita() {
        let myUser='wigo';
        let myPass='haha';
        let username = $('#username').val();
        let password = $('#password').val();
        if(myUser==username){
            if(myPass==password){
                window.location.href='../admin/home/admino.html';
            }else{
                alert('Incorrect Password');
            }
        }else{
            alert("Incorrect usernamer")
        }
    }
});
