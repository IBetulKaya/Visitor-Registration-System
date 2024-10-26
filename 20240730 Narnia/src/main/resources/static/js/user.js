// Declare a variable that holds a reference to the datatable,
// so that we can use it in every function.
var userTable;

function init(){

    console.log('inside init' );

    $("#reset-button").click( function () {
        reset();
    });

    $("#new-user-button").click( function () {
        console.log("Inside click of new-user-button");
        $('#user-modal').modal('show');
    });

    $("#edit-user-button").click( function () {
        console.log("Inside click of edit-user-button");
        // Get the data from selected row and fill fields in modal

        if (userTable.row($('.selected')).data() == undefined) {
            alert("Select user first");
        }else{
            var user = userTable.row($('.selected')).data();
            alert(user.id);
            $("#id").val(user.id);
            $("#name").val(user.name);
            $("#address").val(user.address);
            $("#email").val(user.email);
            $("#age").val(user.age);
            $("#disabled").prop('checked',user.disabled);
   //         $("#disabled").val(user.disabled);
            $("#imageurl").val(user.imageUrl);

            $('#user-modal').modal('show');
        }

    });


    $("#delete-user-button").click( function () {
        console.log("Inside click of delete-user-button");
        // Get the data from selected row and fill fields in modal

        if (userTable.row($('.selected')).data() == undefined) {
            alert("Select user first");
        }else{
            $('#user-delete-modal').modal('show');
        }

    });

    // Button in delete modal
    $("#delete-user-confirm-button").click( function () {
        console.log("Inside click of delete-user-confirm-button");
        deleteUser();
        $('#customer-delete-modal').modal('hide');
    });

    // Add submit event to form for new and edit
    $("#user-form").on('submit', function() {
        console.log("Submitting");
        createUser();
        $('#user-modal').modal('hide');
    });

    initUserTable();
}

function initUserTable() {

    console.log('inside initUserTable' );

    // Create columns (with titles) for datatable: id, name, address, age
    // Note: The 'ID' column is hidden but the value is avaliable
    columns = [
        { "title":  "User ID",
            "data": "id",
            "visible": false },
        { "title":  "Name",
            "data": "name" },
        { "title":  "Address",
            "data": "address" },
        { "title":  "Email",
            "data": "email" },
        { "title": "Age",
            "data": "age"},
        { "title": "Disabled",
            "data": "disabled",
            "render": function( disabled){
                if(disabled){
                    return "Yes";
                }else{
                    return "No";
                }
            }
        },
        { "title": "",
            "data": "imageUrl",
            "render": function( imageUrl){
                return '<img src="' + imageUrl + '" width="20px">';
            }
        }
    ];

    // Define new datatable with above columns and assign it to the variable
    userTable = $("#user-table").DataTable( {
        "order": [[ 0, "asc" ]],
        "columns": columns
    });

    $("#user-table tbody").on( 'click', 'tr', function () {
        console.log("Clicking on row");
        if ( $(this).hasClass('selected') ) {
          $(this).removeClass('selected');
        }
        else {
            userTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    // Get the data from the 'backend' and refresh the table
    getUserData();
}

function createUser(){

    console.log('inside createUser' );

    // Put user data from page in Javascript object --- SIMILAR TO JSON
    var userData = {
            id: $("#id").val(),
            name: $("#name").val(),
            address: $("#address").val(),
            email: $("#email").val(),
            age: $("#age").val(),
            disabled: $("#disabled").prop('checked'),
            imageUrl: $("#imageurl").val()
    }

    // Transform Javascript object to json
    var userJson = JSON.stringify(userData);

    console.log(userJson);

    $.ajax({
        url: "/api/user",
        type: "post",
        data: userJson,    // json for request body
        contentType:"application/json; charset=utf-8",   // What we send to frontend
        dataType: "json",  // What get back from frontend
        // success: function(user, textStatus, jqXHR){
        success: function(user){

          // User object is returned but we don't use it 
          console.log(user);

          // Clear fields in modal page
          $("#id").val('');
          $("#name").val('');
          $("#address").val('');
          $("#email").val('');
          $("#age").val('');
          $("#disabled").val('');
          $("#imageurl").val('');

          // Refresh table data
          getUserData();

        },

        fail: function (error) {
          console.log('Error: ' + error);
        }

    });
}

function getUserData(){

    console.log('inside getUserData' );

    // Get users from the FAKE backend by using a FAKE JQuery class
    // See file myjquery.js
    // We pass a JAVASCRIPT object with everything needed for a REAL JQuery call.
    // Our FAKE JQuery only uses:
    // url
    // success (which is a function)
    // fail (which is a function)
    // When we have a REAL backend we only need to change $$ to $
    $.ajax({
        url: "/api/user",
        type: "get",
        dataType: "json",  // get back from frontend
        // success: function(users, textStatus, jqXHR){
        success: function(users){

          console.log(users);

          // Clear fields in page
          userTable.clear();
          userTable.rows.add(users);
          userTable.columns.adjust().draw();

        },

        fail: function (error) {
          console.log('Error: ' + error);
        }

    });
}

function deleteUser(){

    if (userTable.row($('.selected')).data() == undefined) {
        alert("Select user first");
    }else{
        var user = userTable.row($('.selected')).data();

            $.ajax({
                url: '/api/user/' + user.id,
                type: "delete",
                dataType: "text",  // get back from frontend
                // success: function(user, textStatus, jqXHR){
                success: function(message){

                  console.log(message);

                  // Refresh table data
                  getUserData();

                },

                fail: function (error) {
                  console.log('Error: ' + error);
                }

            });
    }
}