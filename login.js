/**
 * Created by celalyanpar on 03/06/2017.
 */

$( document ).ready(function() {

    var url = window.location;

    // SUBMIT FORM
    $("#loginForm").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPost();
    });


    function ajaxPost(){

        // PREPARE FORM DATA
        var token = "";
        var formData = {
            mail :     $("#mail_login").val(),
            password : $("#password_login").val()
        }
        // DO POST
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "http://localhost:8080/user/login",
            data : JSON.stringify(formData),
            dataType : "text",
            success : function(result) {
               alert("Login Succesful: ",result);
               $("#postResultDiv").html("<strong>" + "Login Succesful" + "</strong>");
               //burada response dan gelen token i okumamiz lazim.
               console.log(result);
               var role = result.substring(1,2);
               var token = "Bearer " + result.substring(2);
               sessionStorage.setItem('secureToken', token);
               console.log(role);
               if(role == "A"){
                 window.location.href = "adminhome.html";
               }
               else {
                window.location.href = "createTicket.html";
               }
            },

            error : function(e) {
                //alert("Error!")
                alert("ERROR: ", e);
                window.location.href = "home.html";
                console.log(JSON.stringify(formData));
            }
        });

        // Reset FormData after Posting
        resetData();
    }

    function setCookie(c_name,value,exdays)
    {
      var exdate=new Date();
      exdate.setDate(exdate.getDate() + exdays);
      var c_value=escape(value) + ((exdays==null) ? "" : ("; expires="+exdate.toUTCString()));
      document.cookie=c_name + "=" + c_value;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function resetData(){
        $("#firstname").val("");
        $("#lastname").val("");
    }
})
