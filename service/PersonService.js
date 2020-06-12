'use strict';

var personDAO = require('../dao/PersonDAO');

/**
 * volunteers inventory
 *
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns List
 **/
exports.peopleGET = function(limit,offset) {
  return personDAO.getPeople(limit,offset);
}


/**
 * Get a specific volunteer
 *
 * id Long person ID
 * returns Person
 **/
exports.personIdGET = function(id) {
  return personDAO.getPersonById(id);
}


/**
 * Save a new volunteer
 *
 * person Object 
 * returns Person
 **/
exports.personPOST = function(person) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(person).length > 0) {

      personDAO.save(person)
        .then((person) => {
          if(person.length) {
            resolve(person[0])
          } else {
            resolve(person);
          }
        }).catch(()=>{
          resolve();
        });

    } else {
      resolve();
    }
  });
}

