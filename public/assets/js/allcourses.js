function getAllCourses() {
    var coursesRow = document.querySelector(".courses .row");
    fetch("/v1/courses").then(function(response) {
        return response.json();
    }).then(function(courses) {
        console.log(courses);
        for(var i=0; i<courses.length; i++) {
            var courseCol = document.createElement("div");
            courseCol.classList.add("col-xl", "col-md-6", "col-sm-12");
            var courseCard = document.createElement("div");
            courseCard.classList.add("card");
            courseCard.style.width = "18rem";
            var coursePhoto = document.createElement("img");
            coursePhoto.classList.add("card-img-top");
            coursePhoto.src = courses[i].image;
            var cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            var cardTitle = document.createElement("a");
            cardTitle.classList.add("card-title");
            cardTitle.href = "./course.html?id=".concat(courses[i].id);
            cardTitle.innerHTML = (courses[i].level).concat(" course");
            var cardText = document.createElement("p");
            cardText.classList.add("card-text");
            cardText.innerHTML = (courses[i].description).split('.')[0];
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            courseCard.appendChild(coursePhoto);
            courseCard.appendChild(cardBody);
            courseCol.appendChild(courseCard);
            coursesRow.appendChild(courseCol);
        }
    })
}
window.onload = function() {
    this.getAllCourses();
}