/**
 * Created by celalyanpar on 03/06/2017.
 */

$( document ).ready(function() {

    var url = window.location;
    var retrievedToken = "";
    // GET REQUEST
    $("#getBtn").click(function(event){
        event.preventDefault();
        retrievedToken = sessionStorage.getItem('secureToken');
        console.log("Retrieved Token Is: ");
        console.log(retrievedToken);
        ajaxGet();
    });

    // DO GET
    function ajaxGet(){
        $.ajax({
            type : "GET",
            url : " http://localhost:8080/user/secure/getallusers",
            headers: {"Authorization": retrievedToken},
            success: function(result){

                    $('#getResultDiv .list-group li').remove();
                    var custList = "";
                    $.each(result, function(i, customer){
                        var customer = "Customer " + i + ": FirstName=" + customer.name + " ,LastName=" + customer.surname + "<br\>";
                        $('#getResultDiv .list-group').append('<li><h4 class="list-group-item">'+customer+'</h4></li>')
                    });
                    console.log("Success: ", result);

            },
            error : function(e) {
                //$("#getResultDiv").html("<strong>Error</strong>");
                //console.log("ERROR: ", e);
            }
        });
    }
})
