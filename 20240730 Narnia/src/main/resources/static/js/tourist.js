var touristTable;
var loggedInTouristTable;
var loggedInCount = 0;
var maxLoggedInCount = 5;
var loggedInTourists = [];

function init() {
    console.log('inside init');

    $("#reset-button").click(function () {
        reset();
    });

    $("#new-tourist-button").click(function () {
        console.log("Inside click of new-tourist-button");
        $('#tourist-modal').modal('show');
    });

    $("#edit-tourist-button").click(function () {
        console.log("Inside click of edit-tourist-button");
        if (touristTable.row($('.selected')).data() == undefined) {
            alert("Select tourist first");
        } else {
            var tourist = touristTable.row($('.selected')).data();
            alert(tourist.id);
            $("#id").val(tourist.id);
            $("#first_name").val(tourist.firstName);
            $("#last_name").val(tourist.lastName);
            $("#city").val(tourist.city);
            $("#age").val(tourist.age);
            $('#tourist-modal').modal('show');
        }
    });

    $("#delete-tourist-button").click(function () {
        console.log("Inside click of delete-tourist-button");
        if (touristTable.row($('.selected')).data() == undefined) {
            alert("Select tourist first");
        } else {
            $('#tourist-delete-modal').modal('show');
        }
    });

    $("#delete-tourist-confirm-button").click(function () {
        console.log("Inside click of delete-tourist-confirm-button");
        deleteTourist();
        $('#tourist-delete-modal').modal('hide');
    });

    $("#tourist-form").on('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the default way
        console.log("Submitting");
        createTourist();
        $('#tourist-modal').modal('hide');
    });

    initTouristTable();
    initLoggedInTouristTable();
}

function initTouristTable() {
    console.log('inside initTouristTable');

    var columns = [
        { "title": "Tourist ID", "data": "id", "visible": false },
        { "title": "First Name", "data": "firstName" },
        { "title": "Last Name", "data": "lastName" },
        { "title": "City", "data": "city" },
        { "title": "Age", "data": "age" },
        {
            "title": "Visit",
            "data": null,
            "defaultContent": "<button class='login-btn'>Visit</button>"
        },
    ];

    touristTable = $("#tourist-table").DataTable({
        "order": [[0, "asc"]],
        "columns": columns
    });

    $("#tourist-table tbody").on('click', 'tr', function () {
        console.log("Clicking on row");
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            touristTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#tourist-table tbody').on('click', 'button.login-btn', function () {
        var data = touristTable.row($(this).parents('tr')).data();
        handleLoginLogout(data, $(this));
    });

    getTouristData();
}

function initLoggedInTouristTable() {
    console.log('inside initLoggedInTouristTable');

    var columns = [
        { "title": "Tourist ID", "data": "id", "visible": false },
        { "title": "First Name", "data": "firstName" },
        { "title": "Last Name", "data": "lastName" },
        { "title": "City", "data": "city" },
        { "title": "Age", "data": "age" },
        {
            "title": "Exit",
            "data": null,
            "defaultContent": "<button class='logout-btn'>Exit</button>"
        },
    ];

    loggedInTouristTable = $("#logged-in-tourist-table").DataTable({
        "order": [[0, "asc"]],
        "columns": columns
    });

    $('#logged-in-tourist-table tbody').on('click', 'button.logout-btn', function () {
        var data = loggedInTouristTable.row($(this).parents('tr')).data();
        handleLoginLogout(data, $(this));
    });
}

function handleLoginLogout(tourist, button) {
    if (button.hasClass('login-btn')) {
        if (loggedInCount >= maxLoggedInCount) {
            alert("You’re denied access and you can try again later! ");
        } else {
            alert("You logged in: " + tourist.firstName + " " + tourist.lastName);
            loggedInCount++;
            button.removeClass('login-btn').addClass('logout-btn').text("Exit");
            loggedInTourists.push(tourist);
            updateTables();
        }
    } else if (button.hasClass('logout-btn')) {
        alert("You logged out: " + tourist.firstName + " " + tourist.lastName);
        loggedInCount--;
        button.removeClass('logout-btn').addClass('login-btn').text("Visit");
        loggedInTourists = loggedInTourists.filter(function(t) { return t.id !== tourist.id; });
        updateTables();
    }
}

function updateTables() {
    loggedInTouristTable.clear();
    loggedInTouristTable.rows.add(loggedInTourists);
    loggedInTouristTable.columns.adjust().draw();

    getTouristData();
}

function createTourist() {
    console.log('inside createTourist');

    var touristData = {
        id: $("#id").val(),
        firstName: $("#first_name").val(),
        lastName: $("#last_name").val(),
        city: $("#city").val(),
        age: $("#age").val(),
    };

    var touristJson = JSON.stringify(touristData);

    console.log(touristJson);

    $.ajax({
        url: "/api/tourist",
        type: "post",
        data: touristJson,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (tourist) {
            console.log(tourist);

            $("#id").val('');
            $("#first_name").val('');
            $("#last_name").val('');
            $("#city").val('');
            $("#age").val('');

            getTouristData();
        },

        error: function (error) {
            console.log('Error: ' + error);
        }
    });
}

function getTouristData() {
    console.log('inside getTouristData');

    $.ajax({
        url: "/api/tourist",
        type: "get",
        dataType: "json",

        success: function (tourists) {
            console.log(tourists);

            // Filter out logged-in tourists from the main table
            var filteredTourists = tourists.filter(function(t) {
                return !loggedInTourists.some(function(loggedInTourist) {
                    return loggedInTourist.id === t.id;
                });
            });

            touristTable.clear();
            touristTable.rows.add(filteredTourists);
            touristTable.columns.adjust().draw();
        },

        error: function (error) {
            console.log('Error: ' + error);
        }
    });
}

function deleteTourist() {
    if (touristTable.row($('.selected')).data() == undefined) {
        alert("Select tourist first");
    } else {
        var tourist = touristTable.row($('.selected')).data();

        $.ajax({
            url: '/api/tourist/' + tourist.id,
            type: "delete",
            dataType: "text",

            success: function (message) {
                console.log(message);
                getTouristData();
            },

            error: function (error) {
                console.log('Error: ' + error);
            }
        });
    }
}
