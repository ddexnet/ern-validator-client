import request from 'superagent/lib/client'
import React from 'react';
import {Panel, Button, Form, FormGroup, ControlLabel, Grid, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

class ERNPanel extends React.Component{
  render(){
    return(
    <div>
      <div>
        <Panel header={this.props.schemaPanel}>
              <xmp>
              <div>
                  {this.props.schemaValidation}
              </div>
              </xmp>
        </Panel>
      </div>
      <div>
          <Panel bsStyle="success" header={this.props.schematronPanel}>
                <xmp>
                   <div>
                          {this.props.schematronValidation.map((schematronValidate) => (
                                                         <p>{schematronValidate.msg}  {schematronValidate.role}</p>
                                                           ))}
                   </div>

                </xmp>
          </Panel>
        </div>
    </div>
      );
    }
  }

export default ERNPanel;
