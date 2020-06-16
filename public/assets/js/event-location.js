const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const eventId = urlParams.get('id');

function getEvent() {
    fetch("/v1/events/".concat(eventId)).then(function(response) {
        return response.json();
    }).then(function(event) {
        document.querySelector("title").innerHTML = event.title.split(";")[0].concat(" location");
        document.querySelector("#breadcrumbEventName a").innerHTML = event.title.split(";")[0];
        document.querySelector("#breadcrumbEventName a").href = "./event.html?id=".concat(eventId);
        document.querySelector("h1").innerHTML = event.title.split(";")[1];
        document.querySelector("#directions").innerHTML = event.location.split(";")[1];
        document.querySelector("iframe").src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCzDgkYS73J7qoN2ibj1E7x_J2gd5UGGZQ&q=".concat(event.location.split(";")[1].replace(/\s+/g, '+').replace(/,/g, ''));
        document.querySelector("#locationButton").href = "./event.html?id=".concat(eventId);
        const eventDateTime = new Date(event.date);
        let monthNumeric = parseInt(eventDateTime.toLocaleDateString('it-IT', { month: 'numeric'}))-1;
        let monthTextual = eventDateTime.toLocaleDateString('en-GB', { month: 'long'});
        document.querySelector("#breadcrumbEventsMonth a").innerHTML = "Events in ".concat(monthTextual);
        document.querySelector("#breadcrumbEventsMonth a").href = "./events-month.html?month=".concat(monthNumeric);
    })
}        

window.onload = function() {
    this.getEvent();
}