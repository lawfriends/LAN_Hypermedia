'use strict';

var utils = require('../utils/writer.js');
var EventService = require('../service/EventService');

module.exports.eventsGET = function eventsGET (req, res, next) {
  var month =  req.swagger.params['month'].value;
  EventService.eventsGET(month)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsIdGET = function eventsIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  EventService.eventsIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsPOST = function eventsPOST (req, res, next) {
  var event = req.swagger.params['event'].value;
  EventService.eventsPOST(event)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsByPersonIdGET = function eventsByPersonIdGET(req, res, next) {
  var id = req.swagger.params['id'].value;
  EventService.eventsByPersonIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}
