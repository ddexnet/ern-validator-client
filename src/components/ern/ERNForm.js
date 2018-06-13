import React from 'react';
import {Panel, Button, Form, FormGroup, ControlLabel, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

function getDropDownOptions(data) {
  let items = [];
  if (data) {
    for (let i = 0; i <= data.length; i++) {
        items.push(<MenuItem title={data[i]}>{data[i]}</MenuItem>)
    }
  }
  return items;
}

class ERNForm extends React.Component{

  constructor() {
    super();
    this.messageSchemaVersionIdList = ['3.4.1', '3.7.1', '3.8.2'];
    this.releaseProfileVersionIdList = ['AudioAlbum', 'AudioAlbumMusicOnly', 'AudioBook', 'AudioSingle', 'BusinessProfile',
      'DigitalBoxedSet', 'DigitalClassicalAudioAlbum', 'FilmBundle', 'LongformVideo', 'MidiRingtone', 'MixedMediaBundle',
       'Ringtone', 'SimpleVideoSingle', 'SingleResourceRelease', 'SingleResourceReleaseWithCoverArt', 'TVSeries', 'VideoAlbum', 'VideoAlbum']
  }

  render(){
    return(
      <Panel header="Insert Document">
        <Form inline id="ern-validate-form" onSubmit={this.props.handleSubmit}>
          <FormGroup onClick={this.props.handleMessageSchemaVersionIdChange}>
            <ButtonToolbar>
              <DropdownButton title={this.props.messageSchemaVersionId} bsSize="small" id="dropdown-size-small">
                {getDropDownOptions(this.messageSchemaVersionIdList)}
              </DropdownButton>
            </ButtonToolbar>
          </FormGroup>
          <FormGroup onClick={this.props.handleReleaseProfileVersionIdChange}>
            <ButtonToolbar>
              <DropdownButton title={this.props.releaseProfileVersionId} bsSize="small" id="dropdown-size-small">
                {getDropDownOptions(this.releaseProfileVersionIdList)}
              </DropdownButton>
            </ButtonToolbar>
          </FormGroup>
          <br/>
          <FormGroup>
            <ControlLabel></ControlLabel>
              {' '}
                <input type="file" name="messageFile" value={this.props.messageFile} onChange={this.props.handleMessageFileChange} />
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
