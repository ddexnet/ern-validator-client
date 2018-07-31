import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import API from '../utils/API';

var ActionCreator = {
  ValidateXML: function (formData) {
    API
    .ValidateXML(formData)
    .then(function (response) {
	  if(response[0]['status']){
	    console.log('An error was detected!');
	  }
      if (!response[0]['schema'].includes('Message vaildates against schema version')){
    	AppDispatcher.dispatch({
          actionType: AppConstants.SCHEMA_VALIDATION,
          schemaValidation: response[0]['schema'],
          schematronValidation : []
        });
      }else{
        console.log(response[0]['schematron']);
        AppDispatcher.dispatch({
          actionType: AppConstants.SCHEMA_VALIDATION,
          schemaValidation: response[0]['schema'],
          schematronValidation : response[0]['schematron']
        });
      }
	}).catch(function(errorMessage){
      var message = 'Sorry but it seems something went wrong.';
      if (errorMessage.message != '') {
        message = errorMessage.message;
      }
	  AppDispatcher.dispatch({
        actionType: AppConstants.SCHEMA_VALIDATION,
        schemaValidation: message,
        schematronValidation : []
      });
    });
  }
};

export default ActionCreator;
