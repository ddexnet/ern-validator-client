import React from 'react';
import {Panel} from 'react-bootstrap';

class ERNPanel extends React.Component{
  render(){
    return(
    <div>
      <div>
        <Panel bsStyle="primary" header={this.props.schemaPanel}>
          <xmp>
            <div>
              {this.props.schemaValidation}
            </div>
          </xmp>
        </Panel>
      </div>
      <div>
        <Panel bsStyle="warning" header={this.props.schematronPanel}>
          <xmp className="xmp-panel">
            <div>
              {this.props.schematronValidation.map((schematronValidate) => (
                <p>{schematronValidate.msg}  {schematronValidate.role}</p>
              ))}
            </div>
          </xmp>
        </Panel>
      </div>
      <div>
        <Panel bsStyle="info" header={this.props.businessProfileSchematronPanel}>
          <xmp className="xmp-panel">
            <div>
              {this.props.businessProfileSchematronValidation.map((schematronValidate) => (
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
