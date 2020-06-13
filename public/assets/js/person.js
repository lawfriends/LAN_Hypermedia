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
        document.querySelector("title").innerHTML = person.name;
        document.querySelector(".breadcrumb .active").innerHTML = person.name;
        //document.querySelector("#teacherPhoto img").src = person.photo;
        document.querySelector("#teacherInfo h1").innerHTML = person.name;
        document.querySelector("#job").innerHTML = person.job;
        document.querySelector("#description1").innerHTML = "From ".concat(person.city);
        document.querySelector("#description2").innerHTML = person.description;
        document.querySelector("#quote").innerHTML = person.quote;
        document.querySelector("#teacherCourse .card img").src = person.courses[0].image;
        document.querySelector("#course").href = "./course.html?id=".concat(person.courses[0].id);
        document.querySelector("#teacherCourse .card-title").innerHTML = person.courses[0].level.concat(" course");
        document.querySelector("#teacherCourse .card-text").innerHTML = (person.courses[0].description).split('.')[0];
    })
}

function getPersonEvents() {
    fetch("/v1/person/".concat(personId).concat("/events")).then(function(response) {
        return response.json();
    }).then(function(events) {
        console.log(events);
        if(events.length == 0){
            var button = document.createElement("button");
            button.classList.add("btn");
            button.setAttribute("id", "noEvent");
            button.setAttribute("type", "button");
            button.innerHTML = "No events by this volunteer";
            document.querySelector("#teacherCourse").appendChild(button);
        }
        else{
            var button = document.createElement("a");
            button.classList.add("btn", "button");
            button.href = "./events-volunteer.html?id=".concat(personId);
            button.setAttribute("role", "button");
            button.innerHTML = "Events by this volunteer";
            document.querySelector("#teacherCourse").appendChild(button);
        }
    })
}

function getPersonComments() {
    var carousel = document.querySelector(".personTestimonials");
    fetch("/v1/comments").then(function(response) {
        return response.json();
    }).then(function(comments) {
        fetch("/v1/person/".concat(personId)).then(function(response) {
            return response.json();
        }).then(function(person) {
            var a = 0;
            for(var i=0; i<comments.length; i++) {
                if(comments[i].person_id==person.id) {
                    a++;
                    var carouselComment = document.createElement("div");
                    carouselComment.classList.add("carousel-item", "carouselComment");
                    if(a==1){
                        carouselComment.classList.add("active");
                    }
                    var row = document.createElement("div");
                    row.classList.add("row", "align-items-center");
                    var firstCol = document.createElement("div");
                    firstCol.classList.add("col-md-4");
                    var secondCol = document.createElement("div");
                    secondCol.classList.add("col-md-8");
                    var studentName = document.createElement("p");
                    studentName.classList.add("overline");
                    var commentDate = document.createElement("p");
                    commentDate.classList.add("peoplecaption");
                    var studentPhoto = document.createElement("img");
                    var studentComment = document.createElement("p");
                    studentComment.classList.add("bquote");
                    let {student_name, text, date, photo} = comments[i];
                    studentPhoto.src = ".".concat(`${photo}`);
                    studentName.innerHTML = `${student_name}`;
                    var commentYear = `${date}`.slice(0,4);
                    commentDate.innerHTML = "Student ".concat(commentYear);
                    studentComment.innerHTML = `${text}`;
                    carousel.appendChild(carouselComment);
                    carouselComment.appendChild(row);
                    row.appendChild(firstCol);
                    firstCol.appendChild(studentPhoto);
                    firstCol.appendChild(studentName);
                    firstCol.appendChild(commentDate);
                    row.appendChild(secondCol);
                    secondCol.appendChild(studentComment);

                    // add controls
                    var controls = document.querySelector(".carousel-indicators");
                    var controller = document.createElement("li");
                    controller.dataset.target = "#carouselIndicatorsTestimonials";
                    controller.setAttribute('data-slide-to', (a-1).toString());
                    if(a==1){
                        controller.classList.add("active");
                    }
                    controls.appendChild(controller);
                }
            }
        })
    
    })
}

function populateButtons(){
    var nextId = parseInt(personId, 10) + 1;
    var previousId = parseInt(personId, 10) - 1;
    if(personId==1){
        document.querySelector("#previousButton").style.display = "none";
    }
    else if(personId==20){
        document.querySelector("#nextButton").style.display = "none";
    }
    document.querySelector("#previousButton").href = "./person.html?id=".concat(previousId);
    document.querySelector("#nextButton").href = "./person.html?id=".concat(nextId);
}

window.onload = function() {
    this.getPerson();
    this.getPersonEvents();
    this.getPersonComments();
    this.populateButtons();
}