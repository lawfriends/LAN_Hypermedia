function getAssociationComments() {
    var mylist = document.querySelector(".carouselComment .row .col-md-4");
    console.log(mylist);
    fetch("/v1/comments").then(function(response) {
        return response.json();
    }).then(function(list) {
        console.log(list)
        for(var i=0; i<3; i++) {
            if(list[i].person_id==null) {
                console.log("NUll ok");
                var studentName = document.createElement("p");
                console.log("ok");
                let {student_name} = list[i];
                studentName.innerHTML = `${student_name}`;
                studentName.classList.add("overline");
                /*var text = document.createTextNode("ciaociao");*/
                /*studentName.appendChild(text);*/
                mylist.appendChild(studentName);
            }
            /*var studentName = document.createElement("li");
            let {level, description } = list[i];
            studentName.innerHTML = `${level} - ${description}`;
            mylist.appendChild(studentName);*/
        }
    })
    var mylist1 = document.querySelector(".carouselComment .row .col-md-8");
    console.log(mylist1);
    fetch("/v1/comments").then(function(response) {
        return response.json();
    }).then(function(list1) {
        console.log(list1)
        for(var i=0; i<3; i++) {
            if(list1[i].person_id==null) {
                console.log("NUll ok");
                var studentComment = document.createElement("p");
                console.log("ok");
                let {text} = list1[i];
                studentComment.innerHTML = `${text}`;
                studentComment.classList.add("bquote");
                /*var text = document.createTextNode("ciaociao");*/
                /*studentName.appendChild(text);*/
                mylist1.appendChild(studentComment);
            }
            /*var studentName = document.createElement("li");
            let {level, description } = list[i];
            studentName.innerHTML = `${level} - ${description}`;
            mylist.appendChild(studentName);*/
        }
    })
}

window.onload = function() {
    this.getAssociationComments();
}