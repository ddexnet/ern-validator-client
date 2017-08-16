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
    this.state = { ernFile: undefined,
                   schemaValidation: '',
                   schemaPanel: 'Schema Validation (XSD)',
                   schematronPanel: 'Schematron Validation',
                   schematronValidation: [],
                   schemaVersion: 'schemaVersion',
                   schematronVersion: 'schematronVersion',
                   profileVersion: 'profileVersion'};


    this.handleErnFileChange = this.handleErnFileChange.bind(this);
    this.handleSchemaVersionChange = this.handleSchemaVersionChange.bind(this);
    this.handleSchematronVersionChange = this.handleSchematronVersionChange.bind(this);
    this.handleProfileVersionChange = this.handleProfileVersionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
    <div>
      <Grid>
        <div>

            <ERNForm handleSubmit={this.handleSubmit}
                     handleSchemaVersionChange={this.handleSchemaVersionChange}
                     schemaVersion={this.state.schemaVersion}
                     handleSchematronVersionChange={this.handleSchematronVersionChange}
                     schematronVersion={this.state.schematronVersion}
                     handleProfileVersionChange={this.handleProfileVersionChange}
                     profileVersion={this.state.profileVersion}
                     ernFile={this.state.ernFile}
                     handleErnFileChange={this.handleErnFileChange}/>

            <ERNPanels schematronValidation={this.state.schematronValidation}
                      schematronPanel={this.state.schematronPanel}
                      schemaValidation={this.state.schemaValidation}
                      schemaPanel={this.state.schemaPanel}/>
          </div>
      </Grid>
  </div>
    );
  }

   handleErnFileChange(event) {
     this.setState({ernFile: event.target.value, schemaPanel: 'Schema Validation (XSD)', schematronValidation: [], schemaValidation: ''});
     ActionCreator.reset();
   }

    handleSchemaVersionChange(event) {
      event.preventDefault();
      this.setState({schemaVersion: event.target.title});
      console.log(this.state.schemaVersion);
    }

   handleSchematronVersionChange(event) {
        event.preventDefault();
        this.setState({schematronVersion: event.target.title});
        console.log(this.state.schematronVersion);
      }

   handleProfileVersionChange(event) {
        event.preventDefault();
        this.setState({profileVersion: event.target.title});
        console.log(this.state.profileVersion);
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

       if (this.state.schemaVersion == ''){
           this.setState({ schemaVersion:'schemaVersion', schemaValidation: '', schemaPanel: 'Schema Validation (XSD)'});
        }

        if (this.state.schematronVersion == ''){
           this.setState({ schematronVersion:'schematronVersion', schematronValidation: []});
        }

        if (this.state.profileVersion == ''){
              this.setState({ profileVersion:'profileVersion', schematronValidation: []});
        }


  }

  handleSubmit(e){
      e.preventDefault();

      // we use FormData as superagent does not support mulitpart on the client
      if (this.state.schemaVersion === "schemaVersion" ||
          this.state.profileVersion === "profileVersion" ||
          this.state.schematronVersion === "schematronVersion"){
                    this.setState({ schemaValidation:'Please choose a schemaVersion, schematronVersion and Profile Version to begin validating your XML Document.'});
                    return false;
      }
      if(this.state.ernFile === '' || this.state.ernFile === undefined){
            this.setState({ schemaValidation:'Please insert Document', schematronValidation:[], schemaPanel: 'Schema Validation (XSD)'});
            return false;
      }
      this.setState({ schemaPanel: 'Schema Validation (XSD) - ' + this.state.ernFile.replace(/^.*[\\\/]/, '')});
      var form = $('#ern-validate-form')[0];
      var formData = new FormData(form);
      formData.append("schemaVersion", this.state.schemaVersion);
      formData.append("schematronVersion", this.state.schematronVersion);
      formData.append("profileVersion", this.state.profileVersion);
      ActionCreator.ValidateXML(formData);
      this.setState({ ernFile:''});

}

}
export default ERNComponent;
