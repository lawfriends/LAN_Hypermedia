'use strict';

const eventDAO = require('../dao/EventDAO');
/**
 * events inventory
 *
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns List
 **/
exports.eventsGET = function(month,limit,offset) {

  return eventDAO.getEvents().then((data) => {

    if(month>-1 && month<13) {
      return data.filter( event => {
        const date = new Date(event.date);
        const currentDate = new Date();
        return date.getMonth() == month && currentDate.getFullYear() == date.getFullYear();
      });
    }

    return data;
  });
}


/**
 * A specific event
 *
 * id Long event id
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns Event
 **/
exports.eventsIdGET = function(id,limit,offset) {
  return new Promise(function(resolve, reject) {
    return eventDAO.getEventById(id).then((event) => {
      resolve(event);
    });
  });
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
      eventDAO.save(event).then((event) => {
        resolve(event);
      });
    } else {
      resolve();
    }
  });
}

