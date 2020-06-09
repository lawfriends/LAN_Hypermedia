const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const eventId = urlParams.get('id')
console.log(eventId);
console.log("/v1/events/".concat(eventId));
function getEvent() {
    fetch("/v1/events/".concat(eventId)).then(function(response) {
        return response.json();
    }).then(function(event) {
        console.log(event);
        document.querySelector(".breadcrumb .active").innerHTML = event.title;
        document.querySelector("#eventPar h1").innerHTML = event.title;
        document.querySelector("#eventPar p.normal").innerHTML = event.description;
        document.querySelector(".CERFlevelPar").innerHTML = event.courses[0].cerf_level;
        document.querySelector("#courseLevelPar").innerHTML = event.courses[0].level.concat(" course");
        const eventDateTime = new Date(event.date);
        let dateOptions = { day: 'numeric', month: 'long', year: 'numeric'};
        let timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false};
        document.querySelector("#eventPar h6").innerHTML = eventDateTime.toLocaleDateString('default', dateOptions).concat(", ".concat(eventDateTime.toLocaleTimeString('default', timeOptions)));
        document.querySelector("#eventImage img").src = event.photos;
        document.querySelector("#eventCourseLink").href = "./course.html?id=".concat(event.courses[0].id);
        document.querySelector("#coordinatorPhoto").src = event.coordinator.photo;
            document.querySelector("#coordinatorName").innerHTML = event.coordinator.name;
            document.querySelector("#coordinatorLink").href = "#";
        /* var teachersRow = document.querySelector(".teachers .row");
        let {volunteers} = course;
        for(var i=0; i<volunteers.length; i++){
            column = document.createElement("div");
            column.classList.add("col-xl", "col-md-4", "col-sm12", "teacher", "text-center");
            var teacherImg = document.createElement("img");
            teacherImg.src = volunteers[i].photo;
            var teacherName = document.createElement("p");
            teacherName.classList.add("overline");
            teacherName.innerHTML = volunteers[i].name;
            column.appendChild(teacherImg);
            column.appendChild(teacherName);
            teachersRow.appendChild(column);
        }
        document.querySelector(".courseSchedule#first .card-header").innerHTML = course.day;
        document.querySelector(".courseSchedule#first .overline").innerHTML = course.time;
        document.querySelector(".courseSchedule#second .card-header").innerHTML = course.day;
        document.querySelector(".courseSchedule#second .overline").innerHTML = course.time;

        for(var j=0; j<2; j++){
            var eventCol = document.querySelector("#eventCol");
            var card = document.createElement("div");
            card.classList.add("card", "eventCard");
            var eventImage = document.createElement("img");
            eventImage.src = course.events[j].photos;
            eventImage.classList.add("card-img-top");
            eventImage.alt = "...";
            var cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            var cardRow = document.createElement("div");
            cardRow.classList.add("row");
            const eventDateTime = new Date(course.events[j].date);
            var eventDate = document.createElement("div");
            eventDate.classList.add("col-3");
            eventDate.setAttribute("id", "eventDate");
            var month = document.createElement("p");
            month.innerHTML = eventDateTime.toLocaleString('default', { month: 'long' }).slice(0,3);
            var day = document.createElement("p");
            day.innerHTML = eventDateTime.toLocaleString('default', { day: 'numeric' });
            var eventInfo = document.createElement("div");
            eventInfo.classList.add("col");
            eventInfo.setAttribute("id", "eventInfo");
            var title = document.createElement("p");
            title.innerHTML = course.events[j].title;
            var location = document.createElement("p");
            location.innerHTML = course.events[j].location;
            var eventButton = document.createElement("a");
            eventButton.href = "#";
            eventButton.classList.add("btn", "button");
            eventButton.innerHTML = "View details";

            eventDate.appendChild(month);
            eventDate.appendChild(day);
            eventInfo.appendChild(title);
            eventInfo.appendChild(location);
            cardRow.appendChild(eventDate);
            cardRow.appendChild(eventInfo);
            cardBody.appendChild(cardRow);
            cardBody.appendChild(eventButton);
            card.appendChild(eventImage);
            card.appendChild(cardBody);
            eventCol.appendChild(card);   
        }*/
    })
}

function getCoordinator() {
    fetch("/v1/events/".concat(eventId)).then(function(response) {
        return response.json();
    }).then(function(event) {
        fetch("/v1/person?id=".concat(event.contact_id)).then(function(response){
            return response.json();
        }).then(function(coordinator){
            document.querySelector("#coordinatorPhoto").src = coordinator.photo;
            document.querySelector("#coordinatorName").innerHTML = coordinator.name;
            document.querySelector("#coordinatorLink").href = "#";
        })
    })
}
        

window.onload = function() {
    this.getEvent();
    //this.getCoordinator();
}