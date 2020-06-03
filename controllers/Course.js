'use strict';

var utils = require('../utils/writer.js');
var CourseService = require('../service/CourseService');
var authService = require('../service/AuthService');

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
      utils.writeJson(res, response);
    });
};

module.exports.coursePOST = function coursePOST (req, res, next) {
  var course = req.swagger.params['course'].value;
  const bearerHeader = req.headers['authorization'];

  authService.verifyToken(bearerHeader)
    .then(()=>{
      CourseService.coursePOST(course)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    }).catch(function (response) {
      utils.writeJson(res, response, 403);
    });
};
