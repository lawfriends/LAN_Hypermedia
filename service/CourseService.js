'use strict';
/**
 * courses inventory
 *
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns List
 **/

var courseDAO = require('../dao/CourseDAO');
var resourceDAO = require('../dao/ResourceDAO');

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
  return courseDAO.getCourseById(id).then((data) => {
    return data.map( element => {
        return element;
    });
  });
}

exports.coursePOST = function(course) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(course).length > 0) {

      courseDAO.save(course).then((course) => {
        resolve(course);
      });
    } else {
      resolve();
    }
  });
}

exports.courseResourcesGET = function(id,limit,offset) {
  return resourceDAO.getResourcesByCourseId(id,limit, offset);
}

exports.courseResourcePOST = function(resource, courseId) {
  return resourceDAO.saveResourceOfCourse(resource, courseId).then((data) => {
    return data.map( element => {
      //composed resourse; element.price = {value: element.value, currency: element.currency}
        return element;
    })
  })
}