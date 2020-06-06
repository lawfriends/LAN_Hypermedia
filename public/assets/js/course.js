const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const courseId = urlParams.get('id')
console.log(courseId);
console.log("/v1/courses/".concat(courseId));
function getCourse() {
    fetch("/v1/courses/".concat(courseId)).then(function(response) {
        return response.json();
    }).then(function(course) {
        console.log(course);
        document.querySelector(".breadcrumb .active").innerHTML = course.level;
        document.querySelector("#coursePar h1").innerHTML = course.level.concat(" course");
        document.querySelector(".CERFlevelPar").innerHTML = course.cerf_level;
        document.querySelector("#coursePar p.normal").innerHTML = course.description;
        document.querySelector("#courseImage img").src = course.image;
        var teachersRow = document.querySelector(".teachers .row");
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

            /* const eventDate = new Date(course.events[0].date);
            document.querySelector("#eventDate p:first-child").innerHTML = eventDate.toLocaleString('default', { month: 'long' }).slice(0,3);
            document.querySelector("#eventDate p:nth-child(2)").innerHTML = eventDate.toLocaleString('default', { day: 'numeric' });
            document.querySelector("#eventInfo p:first-child").innerHTML = course.events[j].title;
            document.querySelector("#eventInfo p:nth-child(2)").innerHTML = course.events[j].location; */       
        }
    })
}
/* function getCourseEvent() {
    fetch("/v1/courses/".concat(courseId)).then(function(response) {
        return response.json();
    }).then(function(course) {
        for(var i=0; i<2; i++){
            fetch("v1/events/".concat(course.event[i].id)).then(function(response) {
                return response.json();
            }).then(function(event) {
                var eventImage = document.querySelector("#eventCard img");
                eventImage.src = event.photos;
            })
        }
    })
} */
        

window.onload = function() {
    this.getCourse();
}