import React from 'react';

function getCount(name, validation) {
  var count = 0;
  for (var i=0, len=validation.length; i<len; i++) {
    if (typeof validation[i] != "object") continue;
    count = validation[i][name];
    return count;
  }
}

class ErrorComponent extends React.Component{
  render(){
    let fatalErrorsCount = getCount('fatalErrors', this.props.validation);
    let conditionalErrorsCount = getCount('conditionalErrors', this.props.validation);
    let errorsCount = getCount('errors', this.props.validation);
    let conditionalFatalErrorsCount = getCount('conditionalFatalErrors', this.props.validation);
    const styleRed = {color : 'red'};
    return(
    <div>
      <xmp className="xmp-panel">
        <div>
          { fatalErrorsCount && fatalErrorsCount != 0 &&
            <p style={styleRed}> Number of Fatal Errors: {fatalErrorsCount} </p>
          }
          { conditionalErrorsCount && conditionalErrorsCount != 0 &&
            <p style={styleRed}> Number of Conditional Errors: {conditionalErrorsCount} </p>
          }
          { errorsCount && errorsCount != 0 &&
            <p style={styleRed}> Number of Errors: {errorsCount} </p>
          }
          { conditionalFatalErrorsCount && conditionalFatalErrorsCount != 0 &&
            <p style={styleRed}> Number of Conditional Fatal Errors: {conditionalFatalErrorsCount} </p>
          }
        </div>
      </xmp>
    </div>
  );
  }
}

export default ErrorComponent;