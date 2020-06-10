function getAllPeople() {
    fetch("/v1/people").then(function(response) {
        return response.json();
    }).then(function(people) {
        for(var i=0; i<people.length; i++){
            if(people[i].role == "coordinator"){
                var coordinatorRow = document.querySelector("#coordinatorRow");
                var coordinatorCol = document.createElement("div");
                coordinatorCol.classList.add("col-xl-5", "col-12", "column");
                var infoRow = document.createElement("div");
                infoRow.classList.add("row");
                var infoCol = document.createElement("div");
                infoCol.classList.add("col");
                var role = document.createElement("p");
                role.classList.add("role");
                role.innerHTML = people[i].role;
                var name = document.createElement("p");
                name.classList.add("name");
                name.innerHTML = people[i].name;
                var description = document.createElement("p");
                description.classList.add("description");
                description.innerHTML = people[i].description;
                var coordinatorButton = document.createElement("a");
                coordinatorButton.href = "#";
                coordinatorButton.classList.add("personLink");
                coordinatorButton.innerHTML = "See profile";
                infoCol.appendChild(role);
                infoCol.appendChild(name);
                infoCol.appendChild(description);
                infoCol.appendChild(coordinatorButton);
                var imageCol = document.createElement("div");
                imageCol.classList.add("col");
                var coordinatorPhoto = document.createElement("img");
                coordinatorPhoto.src = people[i].photo;
                imageCol.appendChild(coordinatorPhoto);
                infoRow.appendChild(infoCol);
                infoRow.appendChild(imageCol);
                coordinatorCol.appendChild(infoRow);
                coordinatorRow.appendChild(coordinatorCol);
            }
        }        
    })
}   

window.onload = function() {
    this.getAllPeople();
}