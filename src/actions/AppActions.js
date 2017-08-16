 import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import API from '../utils/API';

var ActionCreator = {
	ValidateXML: function (formData) {
		API
		.ValidateXML(formData)
			.then(function (response) {
			  if(response[0]['status']){
			    console.log("An error was detected!");

			  }
         if (response[0]['schema'] !== 'Document is valid'){
				  AppDispatcher.dispatch({
          					actionType: AppConstants.SCHEMA_VALIDATION,
          					schemaValidation: response[0]['schema'],
          					schematronValidation : []
          				});
         }else{
         				  AppDispatcher.dispatch({
                   					actionType: AppConstants.SCHEMA_VALIDATION,
                   					schemaValidation: response[0]['schema'],
                   					schematronValidation : response[0]['schematron']
                   				});
         }
			}).catch(function(errorMessage){
                  var errorMessage = "Sorry but it seems something went wrong.";
			            AppDispatcher.dispatch({
                    actionType: AppConstants.SCHEMA_VALIDATION,
                    schemaValidation: errorMessage,
                    schematronValidation : []

                  });
			});
	  }
  };


export default ActionCreator;
