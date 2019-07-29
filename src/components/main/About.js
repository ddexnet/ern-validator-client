import React, { Component } from 'react';
import {Jumbotron, Button, Grid } from 'react-bootstrap';


class About extends Component {
  constructor() {
    super();
    this.state = { about: 'This is a Schema XML validator app. Enjoy!!'};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    this.setState({ about:'DDEX XML Validator is an API that can be used to validate XML documents against schema (XSD) and advanced XML validation (Schematron). XML validator checks to see if an XML document is valid and well formed. A well formed document must meet the standards of XML syntax rules, whereas a valid document must meet the standards of a XML Schema.'});
  }

  render() {
    return (
    <div>
    <Grid>
      <Jumbotron>
        <h1>About</h1>
        <p>{this.state.about}</p>
        <p><Button bsStyle="primary" onClick={this.handleClick}>Learn More</Button></p>
      </Jumbotron>
    </Grid>
    </div>
    );
  }
}

export default About;
