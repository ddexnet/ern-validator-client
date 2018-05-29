import request from 'superagent/lib/client';
import React from 'react';
import {Panel, Button, Form, FormGroup, ControlLabel, Grid, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import ActionCreator from '../../actions/AppActions';
import ERNPanels from './ValidatorPanels';
import ERNForm from './ERNForm';
import Store from '../../stores/ValidateStore';
import Loader from 'react-loader';
var $ = require('jquery');

class ERNComponent extends React.Component {

  constructor() {
    super();
    this.state = { messageFile: undefined,
      schemaValidation: '',
      schemaPanel: 'Schema Validation (XSD)',
      schematronPanel: 'Schematron Validation',
      schematronValidation: [],
      messageSchemaVersionId: 'messageSchemaVersionId',
      releaseProfileVersionId: 'releaseProfileVersionId',
      schemaMessageType: ''};

    this.handleMessageFileChange = this.handleMessageFileChange.bind(this);
    this.handleMessageSchemaVersionIdChange = this.handleMessageSchemaVersionIdChange.bind(this);
    this.handleReleaseProfileVersionIdChange = this.handleReleaseProfileVersionIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
    <div>
      <Grid>
        <div>
          <ERNForm handleSubmit={this.handleSubmit}
            handleMessageSchemaVersionIdChange={this.handleMessageSchemaVersionIdChange}
            messageSchemaVersionId={this.state.messageSchemaVersionId}
            handleReleaseProfileVersionIdChange={this.handleReleaseProfileVersionIdChange}
            releaseProfileVersionId={this.state.releaseProfileVersionId}
            messageFile={this.state.messageFile}
            handleMessageFileChange={this.handleMessageFileChange}/>
          <ERNPanels schematronValidation={this.state.schematronValidation}
            schematronPanel={this.state.schematronPanel}
            schemaValidation={this.state.schemaValidation}
            schemaPanel={this.state.schemaPanel}/>
        </div>
      </Grid>
    </div>
  );
  }

 handleMessageFileChange(event) {
   this.setState({messageFile: event.target.value, schemaPanel: 'Schema Validation (XSD)', schematronValidation: [], schemaValidation: ''});
   ActionCreator.reset();
 }

 handleMessageSchemaVersionIdChange(event) {
   event.preventDefault();
   this.setState({messageSchemaVersionId: event.target.title});
   console.log(this.state.messageSchemaVersionId);
 }

 handleReleaseProfileVersionIdChange(event) {
   event.preventDefault();
   this.setState({releaseProfileVersionId: event.target.title});
   console.log(this.state.releaseProfileVersionId);
 }

 componentWillMount() {
   Store.addChangeListener(this.onChange);
 }

 componentWillUnmount() {
   Store.removeChangeListener(this.onChange);
 }

 onChange() {
   this.setState({ schemaValidation: Store.getSchemaValidation(), schematronValidation: Store.getSchematronValidation().reverse() });
 }

 componentDidUpdate(){
   if (this.state.messageSchemaVersionId == ''){
     this.setState({ messageSchemaVersionId:'messageSchemaVersionId', schemaValidation: '', schemaPanel: 'Schema Validation (XSD)'});
   }
   if (this.state.releaseProfileVersionId == ''){
     this.setState({ releaseProfileVersionId:'releaseProfileVersionId', schematronValidation: []});
   }
 }

 handleSubmit(e){
   e.preventDefault();
   // we use FormData as superagent does not support mulitpart on the client
   if (this.state.messageSchemaVersionId === "messageSchemaVersionId" ||
     this.state.releaseProfileVersionId === "releaseProfileVersionId"){
     this.setState({ schemaValidation:'Please choose a schemaVersion and Profile Version to begin validating your XML Document.'});
     return false;
   }
   if(this.state.messageFile === '' || this.state.messageFile === undefined){
     this.setState({ schemaValidation:'Please insert Document', schematronValidation:[], schemaPanel: 'Schema Validation (XSD)'});
     return false;
   }
   this.setState({ schemaPanel: 'Schema Validation (XSD) - ' + this.state.messageFile.replace(/^.*[\\\/]/, '')});
   var form = $('#ern-validate-form')[0];
   var formData = new FormData(form);
   formData.append("messageSchemaVersionId", 'ern/' + this.state.messageSchemaVersionId);
   formData.append("releaseProfileVersionId", 'commonreleasetypes/14/'  + this.state.releaseProfileVersionId);
   ActionCreator.ValidateXML(formData);
   this.setState({ messageFile:''});
 }
}
export default ERNComponent;
