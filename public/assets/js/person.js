const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const personId = urlParams.get('id');
var incrementId = urlParams.get('incrementId');
var limit;
var offset;
var index;

function getPerson() {
    fetch("/v1/person/".concat(personId)).then(function(response) {
        return response.json();
    }).then(function(person) {
        document.querySelector("title").innerHTML = person.name;
        document.querySelector(".breadcrumb .active").innerHTML = person.name;
        document.querySelector("#teacherPhoto img").src = person.photo.split(";")[1];
        document.querySelector("#teacherInfo h1").innerHTML = person.name;
        document.querySelector("#job").innerHTML = person.job;
        document.querySelector("#description1").innerHTML = "From ".concat(person.city);
        document.querySelector("#description2").innerHTML = person.description;
        document.querySelector("#quote").innerHTML = person.quote;
        if(person.courses.length == 0){
            document.querySelector("#teacherCourse").style.display = "none";
        }
        else{
            document.querySelector("#teacherCourse .card img").src = person.courses[0].image;
            document.querySelector("#course").href = "./course.html?id=".concat(person.courses[0].id);
            document.querySelector("#teacherCourse .card-title").innerHTML = person.courses[0].level.concat(" course");
            document.querySelector("#teacherCourse .card-text").innerHTML = (person.courses[0].description).split('.')[0];
        }
        var carousel = document.querySelector(".personTestimonials");
        var a = 0;
            for(var i=0; i<person.comments.length; i++) {
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
                    let {student_name, text, date, photo} = person.comments[i];
                    studentPhoto.src = (`${photo}`);
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
        if(person.previousID == null){
            document.querySelector("#previousButton").style.display = "none";
            document.querySelector("#nextButton").href = "./person.html?id=".concat(person.nextID);
        }
        if(person.nextID == null){
            document.querySelector("#nextButton").style.display = "none";
            document.querySelector("#previousButton").href = "./person.html?id=".concat(person.previousID);
        }
        else{
            document.querySelector("#nextButton").href = "./person.html?id=".concat(person.nextID);
            document.querySelector("#previousButton").href = "./person.html?id=".concat(person.previousID);
        }
    })
}

function getPersonEvents() {
    fetch("/v1/person/".concat(personId).concat("/events")).then(function(response) {
        return response.json();
    }).then(function(events) {
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

/*function setVariables(){
    if(incrementId == 0){
        limit = 2;
        offset = 0;
        index = 0;
    }
    else if(incrementId == 19){
        limit = 2;
        offset = 18;
        index = 1;
    }
    else{
        limit = 3;
        offset = incrementId-1;
        index = 1;
    }
}

function nullIncrement(){
    var count=0;
    fetch("/v1/people").then(function(response) {
        return response.json();
    }).then(function(people) {
        while(people[count].id != personId){
            count++;
        }
        incrementId = count;
        setVariables();
        var leftLimit = count-1;
        if(leftLimit<0){
            leftLimit = 0;
        }
        var rightLimit = count+1;
        if(rightLimit>19){
            rightLimit=19;
        }
        populateButtons(people.slice(leftLimit, rightLimit+1));
    })
}*/

/*function populateButtons(person){
    if(index==0){
        document.querySelector("#previousButton").style.display = "none";
        document.querySelector("#nextButton").href = "./person.html?id=".concat(person[index+1].id).concat("&incrementId=").concat(parseInt(incrementId, 10)+1);
    }
    else if(index==19){
        document.querySelector("#nextButton").style.display = "none";
        document.querySelector("#previousButton").href = "./person.html?id=".concat(person[index-1].id).concat("&incrementId=").concat(parseInt(incrementId, 10)-1);
    }
    else{
        document.querySelector("#nextButton").href = "./person.html?id=".concat(person[index+1].id).concat("&incrementId=").concat(parseInt(incrementId, 10)+1);
        document.querySelector("#previousButton").href = "./person.html?id=".concat(person[index-1].id).concat("&incrementId=").concat(parseInt(incrementId, 10)-1);
    }
}*/

/*function getAdjacentPeople(){
    fetch("/v1/people".concat("?limit=").concat(limit).concat("&offset=").concat(offset)).then(function(response) {
        return response.json();
    }).then(function(people) {
        populateButtons(people);
    })
}*/

window.onload = function() {
    /*if(incrementId == null){
        this.nullIncrement();
    }
    else{
        this.setVariables(incrementId);
        this.getAdjacentPeople();
    }*/
    this.getPerson();
    this.getPersonEvents();
}