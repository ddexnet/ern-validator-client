'use strict';

var request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line

export default {
  ValidateXML: function(formData) {
    return new Promise((resolve, reject) => {
      request
        .post('https://ddex-validator.smecde.com/api/json/validate')
        .withCredentials()
        .send(formData)
        .set('Accept', 'application/json')
        .end((error, response) => {
          var responseText = JSON.parse(response.text);
          if (responseText.error) reject(responseText);
          resolve(responseText);
        });
    });
  }
}
