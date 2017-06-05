/**
 * Created by celalyanpar on 03/06/2017.
 */

$( document ).ready(function() {

  var eventid = sessionStorage.getItem("clickedTicket");
  var eventsString = sessionStorage.getItem("events");
  var events = JSON.parse(eventsString);
  var event = events[eventid];
  var lastCategory;
  var retrievedToken = sessionStorage.getItem('secureToken');
  var ticketsForThatEvent = [];
  var formData = {
      id : event.id
  }
  var user = "";

  for(i = 0; i < event.categories.length; i++){
    if(event.categories[i].name != ""){
      lastCategory = i
    }
  }
  console.log(event.categories[lastCategory].name);
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "http://localhost:8080/ticket/secure/getAllTicketsForEvent",
        data : JSON.stringify(formData),
        dataType : "json",
        headers: {"Authorization": retrievedToken},
        success : function(result) {
            ticketsForThatEvent = result;
            for(i=0; i<=lastCategory; i++){
              var info = "Category Name: " + event.categories[i].name + " Price: " + event.categories[i].price + "<br\>";
              $('#getResultDiv .pagination').append('</br><li><h4 class="list-group-item">'+info+'</h4></li></br>')
              for(j=event.categories[i].startSeat; j<= event.categories[i].endSeat; j++){
                for(k=0; k<result.length;k++){
                  if(result[k].seatname == j){
                    $('#getResultDiv .pagination').append('<li><a href="#">'+ j +'</a></li>');
                  }
                }
                $('#getResultDiv .pagination').append('<li class="active"><a href="#">'+ j +'</a></li>');
              }
              $('#getResultDiv .pagination').append('</br>');
            }
        },
        error : function(e) {
            //alert("Error!")
            alert("ERROR: ", e);
            console.log(JSON.stringify(formData));
        }
    });

    $.ajax({
        type : "GET",
        url : " http://localhost:8080/user/secure/getmyinfo",
        headers: {"Authorization": retrievedToken},
        success: function(result){

                console.log("user_id is : ");
                console.log(result);
                user=result.id;
                console.log(user);

        },
        error : function(e) {
            //$("#getResultDiv").html("<strong>Error</strong>");
            //console.log("ERROR: ", e);
        }

    });
    $("#ticketCreateForm").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        createTicket();
    });
    $("#turnBackForm").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        window.location.href = "home.html";
    });
    function createTicket(){
      var seat = $("#seat").val();
      console.log(seat);
      var categoryID="";
      for(i=0; i<= lastCategory; i++){
      if(event.categories[i].startSeat<=seat || event.categories[i].endSeat<=seat)
        categoryID= event.categories[i].id;
      }

      var catID = {
        id : categoryID
      }
      var userID = {
        id : user
      }
      console.log(catID);
      var formData = {
          seatname : seat,
          category : catID,
          user     : userID
      }

      console.log(formData);
      $.ajax({
          type : "POST",
          contentType : "application/json",
          url : "http://localhost:8080/ticket/secure/createTicket",
          data : JSON.stringify(formData),
          dataType : "text",
          headers: {"Authorization": retrievedToken},
          success : function(result) {
             alert("Ticket Creation Succesful ",result);
             window.location.href = "home.html";
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
