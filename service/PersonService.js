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
  return personDAO.getPeople();
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "courses" : [ 1, 1 ],
  "role" : "teacher",
  "quote" : "quote",
  "comments" : [ {
    "date" : "12th of March 2019",
    "studentName" : "Nils Jung",
    "id" : 5,
    "text" : "This teacher was very nice"
  }, {
    "date" : "12th of March 2019",
    "studentName" : "Nils Jung",
    "id" : 5,
    "text" : "This teacher was very nice"
  } ],
  "city" : "city",
  "name" : "Marco Rossi",
  "photo" : "photo",
  "description" : "description",
  "id" : 6,
  "job" : "job",
  "events" : [ 5, 5 ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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

