'use strict';

var utils = require('../utils/writer.js');
var Volunteers = require('../service/VolunteersService');

module.exports.volunteersGET = function volunteersGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Volunteers.volunteersGET(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.volunteersIdGET = function volunteersIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Volunteers.volunteersIdGET(id,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
