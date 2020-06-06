'use strict';

var utils = require('../utils/writer.js');
var CourseService = require('../service/CourseService');

module.exports.coursesGET = function coursesGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  CourseService.coursesGET(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.coursesIdGET = function coursesIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  CourseService.coursesIdGET(id,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 404);
    });
};

module.exports.coursePOST = function coursePOST (req, res, next) {
  var course = req.swagger.params['course'].value;
  CourseService.coursePOST(course)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.courseResourcesGET = function courseResourcesGET() {
  var id = req.swagger.params['id'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  CourseService.courseResourcesGET(id,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}

module.exports.courseResourcePOST = function coursePOST (req, res, next) {
  var resource = req.swagger.params['resource'].value;
  var id = req.swagger.params['id'].value;
  CourseService.courseResourcePOST(resource, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};