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
    });
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
  return courseDAO.getCourseById(id);
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