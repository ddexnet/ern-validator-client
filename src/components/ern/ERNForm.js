import request from 'superagent/lib/client'
import React from 'react';
import {Panel, Button, Form, FormGroup, ControlLabel, Grid, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

class ERNForm extends React.Component{
  render(){
    return(
          <Panel header="Insert Document">
            <Form inline id="ern-validate-form" onSubmit={this.props.handleSubmit}>

              <FormGroup onClick={this.props.handleSchemaVersionChange}>
                 <ButtonToolbar>
                   <DropdownButton title={this.props.schemaVersion} bsSize="small" id="dropdown-size-small">
                    <MenuItem title="3.4.1">3.4.1</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem title="3.7.1">3.7.1</MenuItem>
                    <MenuItem divider />
                    <MenuItem title="3.9.1">3.9.1</MenuItem>
                  </DropdownButton>
                </ButtonToolbar>
              </FormGroup>

              <FormGroup onClick={this.props.handleSchematronVersionChange}>
                 <ButtonToolbar>
                   <DropdownButton title={this.props.schematronVersion} bsSize="small" id="dropdown-size-small">
                    <MenuItem title="14">14</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem title="17">17</MenuItem>
                  </DropdownButton>
                </ButtonToolbar>
              </FormGroup>

              <FormGroup onClick={this.props.handleProfileVersionChange}>
                 <ButtonToolbar>
                   <DropdownButton title={this.props.profileVersion} bsSize="small" id="dropdown-size-small">
                    <MenuItem title="AudioAlbumMusicOnly">AudioAlbumMusicOnly</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem title="AudioSingle">AudioSingle</MenuItem>
                  </DropdownButton>
                </ButtonToolbar>
              </FormGroup>
              <br/>
              <FormGroup>
                  <ControlLabel></ControlLabel>
                  {' '}
                  <input type="file" name="ernFile" value={this.props.ernFile} onChange={this.props.handleErnFileChange} />
              </FormGroup>
                {' '}
                <br/>
                <br/>
              <Button bsStyle="primary" type="submit">Validate</Button>
            </Form>
          </Panel>

      );
    }
  }

export default ERNForm;
