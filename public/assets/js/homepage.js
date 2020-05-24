function getAssociationComments() {
    var carousel = document.querySelector(".associationTestimonials");
    fetch("/v1/comments").then(function(response) {
        return response.json();
    }).then(function(comments) {
        a=0;
        while(a<2) {
            for(var i=0; i<comments.length; i++) {
                if(comments[i].person_id==null) {
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
                    var studentComment = document.createElement("p");
                    studentComment.classList.add("bquote");
                    let {student_name, text} = comments[i];
                    studentName.innerHTML = `${student_name}`;
                    studentComment.innerHTML = `${text}`;
                    carousel.appendChild(carouselComment);
                    carouselComment.appendChild(row);
                    row.appendChild(firstCol);
                    firstCol.appendChild(studentName);
                    row.appendChild(secondCol);
                    secondCol.appendChild(studentComment);
                }
            }
        }
    })
}

window.onload = function() {
    this.getAssociationComments();
}