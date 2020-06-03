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
        document.querySelector(".CERFlevelPar").innerHTML = course.cerf_level;
    })
}

window.onload = function() {
    this.getCourse();
}