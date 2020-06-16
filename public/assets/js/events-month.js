const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const eventsMonth = urlParams.get('month');

function getEventsByMonth() {
    var eventsRow = document.querySelector("#eventsRow");
    fetch("/v1/events?month=".concat(eventsMonth)).then(function(response) {
        return response.json();
    }).then(function(events) {
        const eventDateTime = new Date(events[0].date);
        document.querySelector("title").innerHTML = "Events in ".concat(eventDateTime.toLocaleString('en-GB', { month: 'long' }));
        document.querySelector(".breadcrumb .active").innerHTML = "Events in ".concat(eventDateTime.toLocaleString('en-GB', { month: 'long' }));
        document.querySelector("h1").innerHTML = eventDateTime.toLocaleString('en-GB', { month: 'long' }).concat(" ").concat(eventDateTime.toLocaleString('it-IT', { year: 'numeric' }));
        for(var i=0; i<events.length; i++) {
            var eventCol = document.createElement("div");
            eventCol.classList.add("col-xl-4", "col-md-6", "col-sm-12");
            var eventCard = document.createElement("div");
            eventCard.classList.add("card");
            eventCard.setAttribute("id", "eventCard");
            var eventImage = document.createElement("img");
            eventImage.classList.add("card-img-top");
            eventImage.setAttribute("alt", events[i].title.split(";")[0].concat(" image"));
            eventImage.src = events[i].photos;
            var cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            var cardRow = document.createElement("div");
            cardRow.classList.add("row");
            var dateCol = document.createElement("div");
            dateCol.classList.add("col-3");
            dateCol.setAttribute("id", "eventDate");
            const eventDateTime = new Date(events[i].date);
            var timeArray = eventDateTime.toLocaleTimeString('GMT').split(':');
            var day = document.createElement("p");
            day.innerHTML = eventDateTime.toLocaleString('it-IT', { day: 'numeric' });
            dateCol.appendChild(day);
            var infoCol = document.createElement("div");
            infoCol.classList.add("col");
            infoCol.setAttribute("id", "eventInfo");
            var title = document.createElement("p");
            title.innerHTML = events[i].title.split(";")[0];
            infoCol.appendChild(title);
            var time = document.createElement("p");
            time.innerHTML = timeArray[0].concat(":").concat(timeArray[1]);
            infoCol.appendChild(time);
            var location = document.createElement("p");
            location.innerHTML = events[i].location.split(";")[0];
            infoCol.appendChild(location);
            cardRow.appendChild(dateCol)
            cardRow.appendChild(infoCol);
            var detailsButton = document.createElement("a");
            detailsButton.href = "./event.html?id=".concat(events[i].id);
            detailsButton.classList.add("btn", "button");
            detailsButton.innerHTML = "View details";
            cardBody.appendChild(cardRow);
            cardBody.appendChild(detailsButton);
            eventCard.appendChild(eventImage);
            eventCard.appendChild(cardBody);
            eventCol.appendChild(eventCard);
            eventsRow.appendChild(eventCol);
        }
    })
}
window.onload = function() {
    this.getEventsByMonth();
}