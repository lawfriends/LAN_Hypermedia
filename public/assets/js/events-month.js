const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const eventsMonth = urlParams.get('month')
console.log(eventsMonth);
console.log("/v1/events?month=".concat(eventsMonth));
function getEventsByMonth() {
    var eventsRow = document.querySelector("#eventsRow");
    fetch("/v1/events?month=".concat(eventsMonth)).then(function(response) {
        return response.json();
    }).then(function(events) {
        console.log(events);
        for(var i=0; i<events.length; i++) {
            var eventCol = document.createElement("div");
            eventCol.classList.add("col-xl-4", "col-md-6", "col-sm-12");
            var eventCard = document.createElement("div");
            eventCard.classList.add("card");
            eventCard.setAttribute("id", "eventCard");
            var eventImage = document.createElement("img");
            eventImage.classList.add("card-img-top");
            eventImage.setAttribute("alt", events[i].title);
            eventImage.src = events[i].photos;
            var cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            var cardRow = document.createElement("div");
            cardRow.classList.add("row");
            var dateCol = document.createElement("div");
            dateCol.classList.add("col-3");
            dateCol.setAttribute("id", "eventDate");
            const eventDateTime = new Date(events[i].date);
            var day = document.createElement("p");
            day.innerHTML = eventDateTime.toLocaleString('default', { day: 'numeric' });
            dateCol.appendChild(day);
            var infoCol = document.createElement("div");
            infoCol.classList.add("col");
            infoCol.setAttribute("id", "eventInfo");
            var title = document.createElement("p");
            title.innerHTML = events[i].title;
            infoCol.appendChild(title);
            var time = document.createElement("p");
            time.innerHTML = eventDateTime.toLocaleString('default', { hour: 'numeric' }, {hour12: false}).concat(":").concat(eventDateTime.toLocaleString('default', { minute: 'numeric' }));
            infoCol.appendChild(time);
            var location = document.createElement("p");
            location.innerHTML = events[i].location;
            infoCol.appendChild(location);
            cardRow.appendChild(dateCol)
            cardRow.appendChild(infoCol);
            var detailsButton = document.createElement("a");
            detailsButton.href = "#";
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