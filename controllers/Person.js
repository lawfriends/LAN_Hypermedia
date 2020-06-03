'use strict';

var utils = require('../utils/writer.js');
var PersonService = require('../service/PersonService');
var authService = require('../service/AuthService');

module.exports.peopleGET = function peopleGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  PersonService.peopleGET(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.personIdGET = function personIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  PersonService.personIdGET(id,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.personPOST = function personPOST (req, res, next) {
  var person = req.swagger.params['person'].value;
  const bearerHeader = req.headers['authorization'];

  authService.verifyToken(bearerHeader)
    .then(()=>{
      PersonService.personPOST(person)
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
