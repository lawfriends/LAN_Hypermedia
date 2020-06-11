'use strict';


/**
 * volunteers inventory
 *
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns List
 **/

 
var personDAO = require('../dao/PersonDAO');

exports.peopleGET = function(limit,offset) {
  return personDAO.getPeople(limit,offset);
}


/**
 * A specific volunteer
 *
 * id Long person ID
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns Person
 **/
exports.personIdGET = function(id,limit,offset) {
  return personDAO.getPersonById(id);
}

exports.personPOST = function(person) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(person).length > 0) {

      personDAO.save(person).then((person) => {
          resolve(person);
        }).catch(()=>{
          reject();
        });
    } else {
      resolve();
    }
  });
}

