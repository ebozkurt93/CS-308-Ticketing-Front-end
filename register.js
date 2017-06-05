/**
 * Created by celalyanpar on 03/06/2017.
 */

$( document ).ready(function() {

    var url = window.location;

    // SUBMIT FORM
    $("#registerForm").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPost();
    });
    function ajaxPost(){

        // PREPARE FORM DATA
        var formData = {
            name :     $("#name").val(),
            surname :  $("#surname").val(),
            password : $("#password").val(),
            mail :     $("#mail").val(),
            address :  $("#address").val()
        }

        console.log("buradaymmmm");
        // DO POST
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "http://localhost:8080/user/register",
            data : JSON.stringify(formData),
            dataType : 'text',
            success : function(result) {
                    $("#postResultDiv").html("<strong>" + "Post Successfully! Customer's Info: FirstName = "
                        +  $("#name").val() + "</strong>");
                console.log(result);
                // Reset FormData after Posting
                resetData();
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    }

    function resetData(){
        $("#firstname").val("");
        $("#lastname").val("");
    }
})
