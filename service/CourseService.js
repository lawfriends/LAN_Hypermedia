'use strict';
/**
 * courses inventory
 *
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns List
 **/

var courseDAO = require('../dao/CourseDAO');

exports.coursesGET = function(limit,offset) {

  // return sqlDB("courses").limit(limit).offset(offset).then((data)
  return courseDAO.getCourses().then((data) => {
    return data.map( element => {
      //composed resourse; element.price = {value: element.value, currency: element.currency}
        return element;
    })
  })

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
      "level" : "Intermediate",
      "day": "Wednesday",
      "time": "17:00",
      "description": "This is the intermediate course of the Italian Language lessons",
      "location": "Via Edmondo de Amicis, 17, 20123 Milano MI",
      "cerf_level": "B1"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

exports.coursePOST = function(course) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(course).length > 0) {

      courseDAO.save(course)
        .then((course) => {
          resolve(course);
        }).catch(()=>{
          reject();
        });

    } else {
      resolve();
    }
  });
}