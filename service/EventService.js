'use strict';


/**
 * events inventory
 *
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns List
 **/
exports.eventsGET = function(limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "courses" : [ {
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
  } ],
  "coordinator" : {
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
    "course" : [ {
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
    } ],
    "id" : 6,
    "job" : "job",
    "events" : [ null, null ]
  },
  "description" : "description",
  "id" : 0,
  "title" : "Museum visit",
  "photos" : "photos"
}, {
  "courses" : [ {
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
  } ],
  "coordinator" : {
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
    "course" : [ {
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
    } ],
    "id" : 6,
    "job" : "job",
    "events" : [ null, null ]
  },
  "description" : "description",
  "id" : 0,
  "title" : "Museum visit",
  "photos" : "photos"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
    var examples = {};
    examples['application/json'] = {
  "courses" : [ {
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
  } ],
  "coordinator" : {
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
    "course" : [ {
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
    } ],
    "id" : 6,
    "job" : "job",
    "events" : [ null, null ]
  },
  "description" : "description",
  "id" : 0,
  "title" : "Museum visit",
  "photos" : "photos"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
    var examples = {};
    examples['application/json'] = {
  "courses" : [ {
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
  } ],
  "coordinator" : {
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
    "course" : [ {
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
    } ],
    "id" : 6,
    "job" : "job",
    "events" : [ null, null ]
  },
  "description" : "description",
  "id" : 0,
  "title" : "Museum visit",
  "photos" : "photos"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

