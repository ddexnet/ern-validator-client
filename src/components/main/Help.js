import React, { Component } from 'react';
import {Jumbotron, Button, Grid } from 'react-bootstrap';


class Help extends Component {
  constructor() {
      super();
     this.state = { github_api: '',
                    github_client: ''};

      this.handleClick = this.handleClick.bind(this);
    }

     handleClick(e){
          e.preventDefault();
          this.setState({ github_api:<a href="https://github.com/ddexnet/ern-validator-api">DDEX Validator API </a>,
                          github_client:<a href="https://github.com/ddexnet/ern-validator-client">DDEX Validator Client</a>});
    }

  render() {
    return (
    <div>
      <Grid>
        <Jumbotron>
          <h1>Help</h1>
          <p>To use the validator you must select a schemaVersion for the schema (XSD) validation and you must also choose a schemaVersion, profileVersion to use the schematron validator. If you click the button below you will see links to github repositories which shows the open source code and also explains another way of using the schema validator(cURL).
          <br/><br/> {this.state.github_api} <br/> {this.state.github_client}</p>
          <p><Button bsStyle="primary" onClick={this.handleClick}>GitHub</Button></p>
        </Jumbotron>
      </Grid>
    </div>
    );
  }
}

export default Help;
