import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _schemaValidation = [];
let _schematronValidation = [];
let _businessProfileSchematronValidation = [];

function setSchemaValidation(schemaValidation) {
  _schemaValidation = schemaValidation;
}

function setSchematronValidation(schematronValidation) {
  _schematronValidation = schematronValidation;
}

function setBusinessProfileSchematronValidation(businessProfileSchematronValidation) {
  _businessProfileSchematronValidation = businessProfileSchematronValidation;
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

  getBusinessProfileSchematronValidation() {
    return _businessProfileSchematronValidation ;
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
      if(action.schematronValidation != null){
        setSchematronValidation(action.schematronValidation);
      } else {
        setSchematronValidation([]);
      }
      if(action.businessProfileSchematronValidation != null){
        setBusinessProfileSchematronValidation(action.businessProfileSchematronValidation);
      } else {
        setBusinessProfileSchematronValidation([]);
      }
      Store.emitChange();
      break;

      default:
  }
});

export default Store;
