'use strict';


/**
 * volunteers inventory
 *
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns List
 **/
exports.volunteersGET = function(limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
}, {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * A specific volunteer
 *
 * id Long volunteer ID
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns Person
 **/
exports.volunteersIdGET = function(id,limit,offset) {
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

