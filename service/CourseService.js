'use strict';
/**
 * courses inventory
 *
 * returns List
 **/

var courseDAO = require('../dao/CourseDAO');
var resourceDAO = require('../dao/ResourceDAO');

exports.coursesGET = function() {
  return courseDAO.getCourses();
}


/**
 * A specific course
 *
 * id Long course id
 * returns Course
 **/
exports.coursesIdGET = function(id,limit,offset) {
  return courseDAO.getCourseById(id);
}


/**
 * Save a new course
 *
 * course Object 
 * returns Course
 **/
exports.coursePOST = function(course) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(course).length > 0) {

      courseDAO.save(course)
        .then((course) => {
          resolve(course);
        }).catch(()=>{
          resolve();
        });

    } else {
      resolve();
    }
  });
}

/**
 * Resources inventory for a specific course
 *
 * id Long - id of a course
 * returns List
 **/


exports.courseResourcesGET = function(id) {
  return resourceDAO.getResourcesByCourseId(id,limit, offset);
}


/**
 * Save a new resource on a specific course
 *
 * resource Object 
 * courseId Long
 * returns Resource
 **/
exports.courseResourcePOST = function(resource, courseId) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(resource).length > 0) {

      resourceDAO.saveResourceOfCourse(resource, courseId)
        .then((resource) => {
          resolve(resource);
        }).catch(()=>{
          resolve();
        });

    } else {
      resolve();
    }
  });
}