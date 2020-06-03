'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');
var authService = require('../service/AuthService');

module.exports.eventsGET = function eventsGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Event.eventsGET(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsIdGET = function eventsIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Event.eventsIdGET(id,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsPOST = function eventsPOST (req, res, next) {
  var event = req.swagger.params['event'].value;
  const bearerHeader = req.headers['authorization'];

  authService.verifyToken(bearerHeader)
    .then(()=>{
      Event.eventsPOST(event)
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
