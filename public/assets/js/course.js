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
        document.querySelector(".breadcrumb .active").innerHTML = course.level;
        document.querySelector("#coursePar h1").innerHTML = course.level.concat(" course");
        document.querySelector(".CERFlevelPar").innerHTML = course.cerf_level;
        document.querySelector("#coursePar p.normal").innerHTML = course.description;
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
    })
}

window.onload = function() {
    this.getCourse();
}