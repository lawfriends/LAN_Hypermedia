const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const courseId = urlParams.get('id')
console.log(courseId);
function getCourse() {
    fetch("/v1/courses").then(function(response) {
        return response.json();
    }).then(function(courses) {
        var found = 0;
        for(var i=0; i<courses.length && found==0; i++){
            if(courses[i].id==courseId){
                trovato = 1;
                document.querySelector(".CERFlevelPar").innerHTML = courses[i].cerf_level;
            }
        }
    })
}

window.onload = function() {
    this.getCourse();
}