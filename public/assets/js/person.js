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
        document.querySelector("#teacherPhoto img").src = person.photo;
        document.querySelector("#teacherInfo h1").innerHTML = person.name;
        document.querySelector("#job").innerHTML = person.job;
        document.querySelector("#description1").innerHTML = "From ".concat(person.city);
        document.querySelector("#description2").innerHTML = person.description;
        document.querySelector("#quote").innerHTML = person.quote;
    })
}   

window.onload = function() {
    this.getPerson();
}