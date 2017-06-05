/**
 * Created by celalyanpar on 03/06/2017.
 */

$( document ).ready(function() {

    var url = window.location;

    // SUBMIT FORM
    $("#eventCreate").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        window.location.href = "createEvent.html";
    });
    var retrievedToken="";
    $("#addEvent").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        retrievedToken = sessionStorage.getItem('secureToken');
        ajaxPost();
    });

    function ajaxPost(){

        // PREPARE FORM DATA
        var token = "";
        var formData = {
            name      :  $("#eventName").val(),
            info      :  $("#eventInfo").val(),
            actor     :  $("#eventActor").val(),
            imageUrl1 :  $("#eventIU1").val(),
            imageUrl2 :  $("#eventIU2").val(),
            videoUrl :  $("#eventVU").val(),
            categories  :  []
        }
        var category1 = {
          startSeat : $("#1category_start_seat").val(),
          endSeat : $("#1category_end_seat").val(),
          name : $("#1category_name").val(),
          price: $("#1category_price").val()
        }
        var category2 = {
          startSeat : $("#2category_start_seat").val(),
          endSeat : $("#2category_end_seat").val(),
          name : $("#2category_name").val(),
          price: $("#2category_price").val()
        }
        var category3 = {
          startSeat : $("#3category_start_seat").val(),
          endSeat : $("#3category_end_seat").val(),
          name : $("#3category_name").val(),
          price: $("#3category_price").val()
        }
        var category4 = {
          startSeat : $("#4category_start_seat").val(),
          endSeat : $("#4category_end_seat").val(),
          name : $("#4category_name").val(),
          price: $("#4category_price").val()
        }
        formData.categories.push(category1);
        formData.categories.push(category2);
        formData.categories.push(category3);
        formData.categories.push(category4);

        console.log(formData);
        // DO POST
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "http://localhost:8080/event/secure/add",
            data : JSON.stringify(formData),
            dataType : "text",
            headers: {"Authorization": retrievedToken},
            success : function(result) {
               alert("Event Creation Succesful ",result);
               window.location.href = "adminhome.html";
            },

            error : function(e) {
                //alert("Error!")
                alert("ERROR: ", e);
                console.log(JSON.stringify(formData));
            }
        });

        // Reset FormData after Posting
        resetData();
    }

    function resetData(){
        $("#firstname").val("");
        $("#lastname").val("");
    }

  })
