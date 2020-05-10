function getAllCourses2() {
    var mylist = document.querySelector("ul");
    fetch("/v1/courses").then(function(response) {
        return response.json();
    }).then(function(list) {
        console.log(list)
        for(var i=0; i<list.length; i++) {
            var listitem = document.createElement("li");
            let {level, description } = list[i];
            listitem.innerHTML = `${level} - ${description}`;
            mylist.appendChild(listitem);
        }
    })
}

window.onload = function() {
    getAllCourses2();
}