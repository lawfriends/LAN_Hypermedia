'use strict';

const eventDAO = require('../dao/EventDAO');
/**
 * events inventory
 *
 * month Integer filter events by month (optional)
 * returns List
 **/
exports.eventsGET = function(month) {

  return eventDAO.getEvents()
    .then((data) => {

      if(month>-1 && month<12) {
        return data.filter( event => {
          const date = new Date(event.date);
          return date.getMonth() == month;
        });
      }

      return data;
    })
    .catch(()=>{
      return [];
    });
}


/**
 * A specific event
 *
 * id Long event id
 * returns Event
 **/
exports.eventsIdGET = function(id) {
  return eventDAO.getEventById(id);
}


/**
 * Add a new event
 *
 * event Event 
 * returns Event
 **/
exports.eventsPOST = function(event) {

  return new Promise(function(resolve, reject) {
    if (Object.keys(event).length > 0) {
      
      eventDAO.save(event)
        .then((event) => {
          if(event.length) {
            resolve(event[0])
          } else {
            resolve(event);
          }
        })
        .catch(() => {
          resolve();
        })
    } else {
      resolve();
    }
  });
}


/**
 * Get a list of all events for which a specific person is a contact
 *
 * person_id Long 
 * returns List
 **/
exports.eventsByPersonIdGET = function(person_id) {
  return eventDAO.getEventsByPersonId(person_id);
}