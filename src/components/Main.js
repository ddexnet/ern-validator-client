require('normalize.css/normalize.css');
require('styles/App.css');
import Header from './main/Header';
import Ern from './ern/ERNComponent';
import Help from './main/Help';
import About from './main/About';
import '../styles/bootstrap/css/bootstrap.min.css';
import '../styles/bootstrap/css/bootstrap-theme.min.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class AppComponent extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header>
            <Route exact path="/" component={Ern}/>
            <Route path="/help" component={Help}/>
            <Route path="/about" component={About}/>
          </Header>
        </div>
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
