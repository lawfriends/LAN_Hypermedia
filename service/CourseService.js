'use strict';


/**
 * courses inventory
 *
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns List
 **/
exports.coursesGET = function(limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "level" : "introductory",
  "teachers" : [ null, null ],
  "CERF" : "A2",
  "resources" : [ {
    "CERF" : "A2",
    "id" : 5,
    "title" : "Italian Book",
    "url" : "url"
  }, {
    "CERF" : "A2",
    "id" : 5,
    "title" : "Italian Book",
    "url" : "url"
  } ],
  "location" : "location",
  "id" : 1,
  "time" : "16:00",
  "day" : "Monday",
  "events" : [ null, null ]
}, {
  "level" : "introductory",
  "teachers" : [ null, null ],
  "CERF" : "A2",
  "resources" : [ {
    "CERF" : "A2",
    "id" : 5,
    "title" : "Italian Book",
    "url" : "url"
  }, {
    "CERF" : "A2",
    "id" : 5,
    "title" : "Italian Book",
    "url" : "url"
  } ],
  "location" : "location",
  "id" : 1,
  "time" : "16:00",
  "day" : "Monday",
  "events" : [ null, null ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * A specific course
 *
 * id Long course id
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns Course
 **/
exports.coursesIdGET = function(id,limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "level" : "introductory",
  "teachers" : [ null, null ],
  "CERF" : "A2",
  "resources" : [ {
    "CERF" : "A2",
    "id" : 5,
    "title" : "Italian Book",
    "url" : "url"
  }, {
    "CERF" : "A2",
    "id" : 5,
    "title" : "Italian Book",
    "url" : "url"
  } ],
  "location" : "location",
  "id" : 1,
  "time" : "16:00",
  "day" : "Monday",
  "events" : [ null, null ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

