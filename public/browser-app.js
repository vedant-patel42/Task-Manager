// Create task button click event
document.getElementById("create-task-button").addEventListener("click", function() {
    // Get task name and description from the form
    var taskName = document.getElementById("create-task-name").value;
    var taskDescription = document.getElementById("create-task-description").value;

    // Send a POST request to the backend service to create the task
    // The endpoint URL and data format will depend on the backend service you are using
    fetch('/create-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            taskName: taskName,
            taskDescription: taskDescription
        })
    })
    .then(response => response.json())
    .then(data => {
        // Add the new task to the table
        var taskListTableBody = document.getElementById("task-list-table-body");
        var newRow = taskListTableBody.insertRow();
        var taskNameCell = newRow.insertCell(0);
        var taskDescriptionCell = newRow.insertCell(1);
        var actionsCell = newRow.insertCell(2);

        taskNameCell.innerHTML = taskName;
        taskDescriptionCell.innerHTML = taskDescription;
        actionsCell.innerHTML = '<button class="update-task-button">Update</button> <button class="delete-task-button">Delete</button>';
    });
});

// Update task button click event
document.getElementById("task-list-table-body").addEventListener("click", function(event) {
    if (event.target.matches(".update-task-button")) {
        // Get the task ID from the table row
        var taskId = event.target.parentNode.parentNode.getAttribute("data-task-id");

        // Send a GET request to the backend service to get the task data
        // The endpoint URL and data format will depend on the backend service you are using
        fetch('/get-task/' + taskId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Fill the update task form with the task data
            document.getElementById("update-task-name").value = data.taskName;
            document.getElementById("update-task-description").value = data.taskDescription;

            // Show the update task form
            document.getElementById("update-task-form").style.display = "block";
        });
    }
});
document.getElementById("update-task-form-update-button").addEventListener("click", function(event) {
    event.preventDefault();

    // Get the task details from the form
    var taskId = document.getElementById("update-task-form-id").value;
    var taskName = document.getElementById("update-task-form-name").value;
    var taskDescription = document.getElementById("update-task-form-description").value;

    // Send a PUT request to the backend service to update the task
    // The endpoint URL and data format will depend on the backend service you are using
    fetch('/update-task/' + taskId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            taskName: taskName,
            taskDescription: taskDescription
        })
    })
    .then(response => response.json())
    .then(data => {
        // Update the task in the table
        var taskRow = document.querySelector("#task-list-table-body tr[data-task-id='" + taskId + "']");
        taskRow.querySelector("td:first-child").innerHTML = taskName;
        taskRow.querySelector("td:nth-child(2)").innerHTML = taskDescription;

        // Hide the update task form
        document.getElementById("update-task-form").style.display = "none";
    });
});
