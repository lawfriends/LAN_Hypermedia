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
  "teachers" : [ {
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
  } ],
  "CERF" : "A2",
  "resources" : [ {
    "CERF" : "A2",
    "id" : 1,
    "title" : "Italian Book",
    "url" : "url"
  }, {
    "CERF" : "A2",
    "id" : 1,
    "title" : "Italian Book",
    "url" : "url"
  } ],
  "location" : "location",
  "id" : 0,
  "time" : "16:00",
  "day" : "Monday",
  "events" : [ 6, 6 ]
}, {
  "level" : "introductory",
  "teachers" : [ {
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
  } ],
  "CERF" : "A2",
  "resources" : [ {
    "CERF" : "A2",
    "id" : 1,
    "title" : "Italian Book",
    "url" : "url"
  }, {
    "CERF" : "A2",
    "id" : 1,
    "title" : "Italian Book",
    "url" : "url"
  } ],
  "location" : "location",
  "id" : 0,
  "time" : "16:00",
  "day" : "Monday",
  "events" : [ 6, 6 ]
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
  "teachers" : [ {
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
  } ],
  "CERF" : "A2",
  "resources" : [ {
    "CERF" : "A2",
    "id" : 1,
    "title" : "Italian Book",
    "url" : "url"
  }, {
    "CERF" : "A2",
    "id" : 1,
    "title" : "Italian Book",
    "url" : "url"
  } ],
  "location" : "location",
  "id" : 0,
  "time" : "16:00",
  "day" : "Monday",
  "events" : [ 6, 6 ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

