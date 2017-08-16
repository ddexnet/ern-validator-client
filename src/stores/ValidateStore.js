import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _schemaValidation = [];
let _validateError = '';
let _schematronValidation = [];

function setSchemaValidation(schemaValidation) {
  _schemaValidation = schemaValidation;
}

function setSchematronValidation(schematronValidation) {
  _schematronValidation = schematronValidation;
}

function setValidateError(validateError) {
  _validateError = validateError;
}

 function reset() {
     _schematronValidation = [];
    }

class StoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  updateListener(callback){
    this.removeListener(CHANGE_EVENT, callback)
    this.on(CHANGE_EVENT, callback)


  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

    getSchemaValidation() {
      return _schemaValidation ;
    }

    getSchematronValidation() {
      return _schematronValidation ;
    }

    getValidateError() {
      return _validateError;
    }

}

const Store = new StoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
Store.dispatchToken = AppDispatcher.register(action => {
  switch(action.actionType) {
    case AppConstants.SCHEMA_VALIDATION:
      setSchemaValidation(action.schemaValidation);
      setSchematronValidation(action.schematronValidation);
      // We need to call emitChange so the event listener
      // knows that a change has been made
      Store.emitChange();
      break;
    case AppConstants.VALIDATE_ERROR:
      setValidateError(action.validateError);
      Store.emitChange();
      break;
    case AppConstants.SCHEMATRON_VALIDATION:
      setSchematronValidation(action.schematronValidation);
      Store.emitChange();
      break;

    case AppConstants.RESET:
      setSchematronValidation(action.schematronValidation);
      setSchemaValidation(action.schematronValidation);
      Store.emitChange();
      break;

    default:
  }
});

export default Store;
