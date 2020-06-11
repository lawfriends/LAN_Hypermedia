const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const personId = urlParams.get('id')
console.log(personId);
function getPerson() {
    fetch("/v1/person/".concat(personId)).then(function(response) {
        return response.json();
    }).then(function(person) {
        console.log(person);
        //document.querySelector("#teacherPhoto img").src = person.photo;
        document.querySelector("#teacherInfo h1").innerHTML = person.name;
        document.querySelector("#job").innerHTML = person.job;
        document.querySelector("#description1").innerHTML = "From ".concat(person.city);
        document.querySelector("#description2").innerHTML = person.description;
        document.querySelector("#quote").innerHTML = person.quote;
        document.querySelector(".card img").src = person.courses[0].image;
        document.querySelector(".card-body a").href = "./course.html?id=".concat(person.courses[0].id);
        document.querySelector(".card-body a").innerHTML = person.courses[0].level.concat(" course");
        document.querySelector(".card-text").innerHTML = (person.courses[0].description).split('.')[0];
        if(person.events == undefined){
            var button = document.createElement("button");
            button.classList.add("btn");
            button.setAttribute("id", "noEvent");
            button.setAttribute("type", "button");
            button.innerHTML = "No events by this volunteer";
            document.querySelector("#teacherEvent").appendChild(button);
        }
        else{
            var button = document.createElement("a");
            button.classList.add("btn", "button");
            button.href = "./event.html?id=".concat(person.events.id);
            button.setAttribute("role", "button");
            button.innerHTML = "Events by this volunteer";
            document.querySelector("#teacherEvent").appendChild(button);
        }
    })
}


window.onload = function() {
    this.getPerson();
}