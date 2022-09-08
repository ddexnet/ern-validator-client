import React from 'react';
import { Grid } from 'react-bootstrap';
import ActionCreator from '../../actions/AppActions';
import ERNPanels from './ValidatorPanels';
import ERNForm from './ERNForm';
import Store from '../../stores/ValidateStore';
import LoadingModal from '../../utils/LoadingModal';

var $ = require('jquery');

class ERNComponent extends React.Component {

  constructor() {
    super();
    this.state = { messageFile: undefined,
      schemaValidation: '',
      schemaPanel: 'Schema Validation (XSD)',
      schematronPanel: 'Schematron Validation',
      schematronValidation: [],
      businessProfileSchematronPanel: 'Business Profile Schematron Validation',
      businessProfileSchematronValidation:[],
      messageSchemaVersionId: 'Schema Version',
      releaseProfileVersionId: 'Release Profile',
      schemaMessageType: '',
      businessProfileValidationRequired: false,
      schema:'Schema',
      isLoading: false };

    this.handleMessageFileChange = this.handleMessageFileChange.bind(this);
    this.handleMessageSchemaVersionIdChange = this.handleMessageSchemaVersionIdChange.bind(this);
    this.handleReleaseProfileVersionIdChange = this.handleReleaseProfileVersionIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.handleSchemaChange = this.handleSchemaChange.bind(this);
  }

  render() {
    return (
    <div>
      <Grid>
        <div>
          { this.state.isLoading &&
            <LoadingModal/>
          }
          <ERNForm handleSubmit={this.handleSubmit}
            handleMessageSchemaVersionIdChange={this.handleMessageSchemaVersionIdChange}
            messageSchemaVersionId={this.state.messageSchemaVersionId}
            handleReleaseProfileVersionIdChange={this.handleReleaseProfileVersionIdChange}
            releaseProfileVersionId={this.state.releaseProfileVersionId}
            messageFile={this.state.messageFile}
            handleMessageFileChange={this.handleMessageFileChange}
            onStatusChange={this.onStatusChange}
            businessProfileValidationRequired={this.state.businessProfileValidationRequired}
            schema={this.state.schema}
            isLoading={this.state.isLoading}
            handleSchemaChange={this.handleSchemaChange}/>
          <ERNPanels schematronValidation={this.state.schematronValidation}
            schematronPanel={this.state.schematronPanel}
            schemaValidation={this.state.schemaValidation}
            schemaPanel={this.state.schemaPanel}
            businessProfileSchematronPanel={this.state.businessProfileSchematronPanel}
            businessProfileSchematronValidation={this.state.businessProfileSchematronValidation}/>
        </div>
      </Grid>
    </div>
  );
  }

  handleMessageFileChange(event) {
   this.setState({ messageFile: event.target.value, schemaPanel: 'Schema Validation (XSD)', schemaValidation: '', schematronValidation: [], businessProfileSchematronValidation: [] });
  }
  
  onStatusChange(event) {
    this.setState({businessProfileValidationRequired: event.target.checked});
  }

  handleMessageSchemaVersionIdChange(event) {
    event.preventDefault();
    this.setState({messageSchemaVersionId: event.target.title});
  }
  
  handleSchemaChange(event) {
    event.preventDefault();
    this.setState({ schema: event.target.title, messageSchemaVersionId: 'Schema Version', releaseProfileVersionId: 'Release Profile' });
  }

  handleReleaseProfileVersionIdChange(event) {
    event.preventDefault();
    this.setState({releaseProfileVersionId: event.target.title});
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({ schemaValidation: Store.getSchemaValidation(), schematronValidation: Store.getSchematronValidation().reverse(), businessProfileSchematronValidation: Store.getBusinessProfileSchematronValidation().reverse(), isLoading: false });
  }

  componentDidUpdate(){
    if (this.state.messageSchemaVersionId == '') {
      this.setState({ messageSchemaVersionId:'Schema Version', schemaValidation: '', schematronValidation: [], businessProfileSchematronValidation: [], schemaPanel:'Schema Validation (XSD)' });
    }
    if (this.state.releaseProfileVersionId == '') {
      this.setState({ releaseProfileVersionId:'Release Profile', schemaValidation: '', schematronValidation: [], businessProfileSchematronValidation: [] });
    }
    if (this.state.schema == '') {
      this.setState({ schema:'Schema', businessProfileSchematronValidation: [], schemaValidation: '', schematronValidation: [] });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    // we use FormData as superagent does not support mulitpart on the client
    if(this.state.messageFile === '' || this.state.messageFile === undefined){
      this.setState({ schemaValidation:'Please insert Document', schematronValidation:[], schemaPanel: 'Schema Validation (XSD)'});
      return false;
    }
    this.setState({ schemaPanel: 'Schema Validation (XSD) - ' + this.state.messageFile.replace(/^.*[\\\/]/, '')});
    var form = $('#ern-validate-form')[0];
    var formData = new FormData(form);
    if (this.state.messageSchemaVersionId == 'Schema Version') {
      formData.append('messageSchemaVersionId', '');
    } else {
      const selectedSchema = (this.state.schema == 'Schema') ? 'ern' : this.state.schema;
      formData.append('messageSchemaVersionId', selectedSchema.toLowerCase() + '/' + this.state.messageSchemaVersionId);
    }
    if (this.state.releaseProfileVersionId == 'Release Profile') {
      formData.append('releaseProfileVersionId', 'none');
    } else {
      formData.append('releaseProfileVersionId', this.state.releaseProfileVersionId);
    }
    if (this.state.messageSchemaVersionId == '3.8.2' || this.state.messageSchemaVersionId == '3.7.1') {
      formData.append('businessProfileValidationRequired', true);
    }
    this.setState({ isLoading: true});
    ActionCreator.ValidateXML(formData);
    this.setState({ messageFile:''});
  }
}
export default ERNComponent;
