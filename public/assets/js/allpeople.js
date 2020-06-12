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
                infoRow.classList.add("row", "flex-column-reverse", "flex-sm-row");
                var infoCol = document.createElement("div");
                infoCol.classList.add("col");
                var role = document.createElement("p");
                role.classList.add("coordinatorRole");
                role.innerHTML = people[i].role;
                var name = document.createElement("p");
                name.classList.add("coordinatorName");
                name.innerHTML = people[i].name;
                var description = document.createElement("p");
                description.classList.add("coordinatorDescription");
                description.innerHTML = people[i].description;
                var coordinatorButton = document.createElement("a");
                coordinatorButton.href = "./person.html?id=".concat(people[i].id);
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
            else if(people[i].role == "teacher"){
                var teacherRow = document.querySelector("#teacherRow");
                var teacherCol = document.createElement("div");
                teacherCol.classList.add("col-xl-3", "col-md-5", "col-12", "column");
                var infoRow = document.createElement("div");
                infoRow.classList.add("row");
                var infoCol = document.createElement("div");
                infoCol.classList.add("col");
                var name = document.createElement("p");
                name.classList.add("teacherName");
                name.innerHTML = people[i].name;
                //var description = document.createElement("p");
                //description.classList.add("teacherDescription");
                //description.innerHTML = "Volunteer from 2012";
                var teacherButton = document.createElement("a");
                teacherButton.href = "./person.html?id=".concat(people[i].id);
                teacherButton.classList.add("personLink");
                teacherButton.innerHTML = "See profile";
                infoCol.appendChild(name);
                infoCol.appendChild(teacherButton);
                var imageCol = document.createElement("div");
                imageCol.classList.add("col");
                var teacherPhoto = document.createElement("img");
                teacherPhoto.src = people[i].photo;
                imageCol.appendChild(teacherPhoto);
                infoRow.appendChild(infoCol);
                infoRow.appendChild(imageCol);
                teacherCol.appendChild(infoRow);
                teacherRow.appendChild(teacherCol);
            }
        }        
    })
}   

window.onload = function() {
    this.getAllPeople();
}