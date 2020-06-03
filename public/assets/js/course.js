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
        let {description} = course;
        console.log(course);
        console.log(`${description}`);
        document.querySelector(".breadcrumb .active").innerHTML = course.level;
        console.log(document.querySelectorAll("#coursePar h1"));
        document.querySelector("#coursePar h1").innerHTML = course.level.concat(" course");
        document.querySelector(".CERFlevelPar").innerHTML = course.cerf_level;
        document.querySelector("#coursePar p.normal").innerHTML = course.description;
        document.querySelector(".courseSchedule .card-header").innerHTML = course.day;
        document.querySelector(".courseSchedule .overline").innerHTML = course.time;
        /* document.querySelector(".courseSchedule:nth-of-type(2) .card-header").innerHTML = course.day;
        document.querySelector(".courseSchedule:nth-of-type(2) .overline").innerHTML = course.time; */
    })
}

window.onload = function() {
    this.getCourse();
}