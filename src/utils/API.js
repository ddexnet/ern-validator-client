'use strict';

var request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line

export default {
  ValidateXML: function(formData) {
    return new Promise((resolve, reject) => {
      request
        .post('http://localhost:6060/api/json/validateXML')
        .withCredentials()
         .send(formData)
        .set('Accept', 'application/json')
        .end((error, response) => {
          console.log(error);
          if (error) reject(error);
          resolve(JSON.parse(response.text));
        });
    });
  },
    schematronValidate: function(formData) {
      return new Promise((resolve, reject) => {
        request
          .post('http://localhost:6060/api/json/validateSchematron')
          .withCredentials()
           .send(formData)
           .set('Accept', 'application/json')
          .end((error, response) => {
          console.log(JSON.parse(response.text));
            if (error) reject(error);
            resolve(JSON.parse(response.text));
          });
      });
    }



}
