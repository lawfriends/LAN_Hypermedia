const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const courseId = urlParams.get('id');

function getCourse() {
    fetch("/v1/courses/".concat(courseId)).then(function(response) {
        return response.json();
    }).then(function(course) {
        document.querySelector("title").innerHTML = course.level.concat(" course");
        document.querySelector(".breadcrumb .active").innerHTML = course.level.concat(" course");
        document.querySelector("#coursePar h1").innerHTML = course.level.concat(" course");
        document.querySelector(".CERFlevelPar").innerHTML = course.cerf_level;
        document.querySelector("#coursePar p.normal").innerHTML = course.description;
        document.querySelector("#courseImage img").src = course.image;
        var teachersRow = document.querySelector(".teachers .row");
        let {volunteers} = course;
        for(var i=0; i<volunteers.length; i++){
            column = document.createElement("div");
            column.classList.add("col-xl", "col-md-4", "col-sm12", "text-center");
            var teacherImg = document.createElement("img");
            teacherImg.src = volunteers[i].photo.split(";")[0];
            var teacherName = document.createElement("p");
            teacherName.classList.add("overline");
            teacherName.innerHTML = volunteers[i].name;
            var teacherLink = document.createElement("a");
            teacherLink.classList.add("teacherLink");
            teacherLink.href = "./person.html?id=".concat(volunteers[i].id);
            var teacherDiv = document.createElement("div");
            teacherDiv.classList.add("teacher");
            teacherDiv.appendChild(teacherImg);
            teacherDiv.appendChild(teacherName);
            teacherLink.appendChild(teacherDiv);
            column.appendChild(teacherLink);
            teachersRow.appendChild(column);
        }
        var scheduleDays = course.daysOfWeek.split(";");
        var scheduleTimes = course.times.split(";");
        document.querySelector(".courseSchedule#first .card-header").innerHTML = scheduleDays[0];
        document.querySelector(".courseSchedule#first .overline").innerHTML = scheduleTimes[0];
        document.querySelector(".courseSchedule#second .card-header").innerHTML = scheduleDays[1];
        document.querySelector(".courseSchedule#second .overline").innerHTML = scheduleTimes[1];

        document.querySelector("#resourcesButton").href = "./resources.html?id=".concat(courseId);

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
            title.innerHTML = course.events[j].title.split(";")[0];
            var location = document.createElement("p");
            location.innerHTML = course.events[j].location.split(";")[0];
            var eventButton = document.createElement("a");
            eventButton.href = "./event.html?id=".concat(course.events[j].id);
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
        }
    })
}        

window.onload = function() {
    this.getCourse();
}