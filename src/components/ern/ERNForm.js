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

function getReleaseProfileDropDownOptions(data, messageSchemaVersionId) {
  let items = [];
  items.push(<MenuItem title='None'>None</MenuItem>)
  if (messageSchemaVersionId && messageSchemaVersionId !== 'Schema Version') {
    const dict = {'3.7.1': 'v1.3', '3.8.1': 'v1.4', '3.8.2': 'v1.4', '3.8.3': 'v1.4', '4.1': 'v2.1', '4.1.1': 'v2.1', '4.2': 'v2.1'};
    const value = data[dict[messageSchemaVersionId]];
    for (let i = 0; i <= value.length; i++) {
      items.push(<MenuItem title={value[i]}>{value[i]}</MenuItem>)
    }
  }
  return items;
}

class ERNForm extends React.Component{

  constructor(props) {
    super(props);
    this.schemaList = ['ERN', 'RIN', 'MLC', 'MEAD', 'RDR-N', 'PIE'];
    this.ernMessageSchemaVersionIdList = ['3.4.1', '3.7.1', '3.8.1','3.8.2', '3.8.3', '4.1', '4.1.1', '4.2'];
    this.rinMessageSchemaVersionIdList = ['1.0 Full', '2.0'];
    this.mlcMessageSchemaVersionIdList = ['1.3.1', '1.4'];
    this.rdrMessageSchemaVersionIdList = ['1.5'];
    this.pieMessageSchemaVersionIdList = ['1.0'];
    this.meadMessageSchemaVersionIdList = ['1.0', '1.1', '1.0.1'];
    this.messageSchemaVersionIdList = ['Please select a schema.'];
    this.releaseProfileVersionIdList = {'v1.3':[ 'AudioAlbum', 'AudioAlbumMusicOnly', 'AudioAlbumMusicAndSpeech', 'AudioSingle', 'AudioBook', 'DigitalBoxedSet',
         'DigitalClassicalAudioAlbum', 'FilmBundle', 'LongformVideo', 'MidiRingtone', 'MixedMediaBundle', 'ReleaseProfileDeletedRules', 'Ringtone', 'SimpleVideoSingle',
         'SingleResourceRelease','SingleResourceReleaseWithCoverArt', 'TVSeries', 'VideoAlbum', 'VideoSingle', 'Wallpaper' ],
        'v1.4':[ 'AudioAlbum', 'AudioAlbumMusicOnly', 'AudioSingle', 'AudioBook', 'DigitalBoxedSet', 'DigitalClassicalAudioAlbum', 'FilmBundle', 'LongformVideo',
          'MidiRingtone', 'MixedMediaBundle', 'Ringtone', 'SimpleVideoSingle', 'SingleResourceRelease','SingleResourceReleaseWithCoverArt', 'TVSeries', 'VideoAlbum',
          'VideoSingle', 'Wallpaper' ],
        'v2.1':[ 'Audio', 'BoxedSetVariant', 'ClassicalVariant', 'DjMix', 'LongFormMusicalWorkVideo', 'MixedMedia', 'ReleaseProfileTrackReleaseRules', 'Ringtone',
          'SimpleAudioSingle', 'SimpleVideoSingle', 'Video']}
  }

  render(){
    return(
      <Panel header="Insert Document">
        <Form inline id="ern-validate-form" onSubmit={this.props.handleSubmit}>
          <FormGroup onClick={this.props.handleSchemaChange}>
            <ButtonToolbar>
              <DropdownButton title={this.props.schema} bsSize="small" id="dropdown-size-small">
                {getDropDownOptions(this.schemaList)}
              </DropdownButton>
            </ButtonToolbar>
          </FormGroup>
          { this.props.schema === 'Schema'&&
          <FormGroup onClick={this.props.handleMessageSchemaVersionIdChange}>
            <ButtonToolbar>
              <DropdownButton title={this.props.messageSchemaVersionId} bsSize="small" id="dropdown-size-small">
                {getDropDownOptions(this.messageSchemaVersionIdList)}
              </DropdownButton>
            </ButtonToolbar>
          </FormGroup>
          }
          { this.props.schema === 'ERN'&&
          <FormGroup onClick={this.props.handleMessageSchemaVersionIdChange}>
            <ButtonToolbar>
              <DropdownButton title={this.props.messageSchemaVersionId} bsSize="small" id="dropdown-size-small">
                {getDropDownOptions(this.ernMessageSchemaVersionIdList)}
              </DropdownButton>
            </ButtonToolbar>
          </FormGroup>
          }
          { this.props.schema === 'RIN'&&
          <FormGroup onClick={this.props.handleMessageSchemaVersionIdChange}>
            <ButtonToolbar>
              <DropdownButton title={this.props.messageSchemaVersionId} bsSize="small" id="dropdown-size-small">
                {getDropDownOptions(this.rinMessageSchemaVersionIdList)}
              </DropdownButton>
            </ButtonToolbar>
          </FormGroup>
          }
          { this.props.schema === 'MLC'&&
            <FormGroup onClick={this.props.handleMessageSchemaVersionIdChange}>
              <ButtonToolbar>
                <DropdownButton title={this.props.messageSchemaVersionId} bsSize="small" id="dropdown-size-small">
                  {getDropDownOptions(this.mlcMessageSchemaVersionIdList)}
                </DropdownButton>
              </ButtonToolbar>
            </FormGroup>
          }
          { this.props.schema === 'MEAD'&&
            <FormGroup onClick={this.props.handleMessageSchemaVersionIdChange}>
              <ButtonToolbar>
                <DropdownButton title={this.props.messageSchemaVersionId} bsSize="small" id="dropdown-size-small">
                  {getDropDownOptions(this.meadMessageSchemaVersionIdList)}
                </DropdownButton>
              </ButtonToolbar>
            </FormGroup>
          }
          { this.props.schema === 'RDR-N'&&
          <FormGroup onClick={this.props.handleMessageSchemaVersionIdChange}>
            <ButtonToolbar>
              <DropdownButton title={this.props.messageSchemaVersionId} bsSize="small" id="dropdown-size-small">
                {getDropDownOptions(this.rdrMessageSchemaVersionIdList)}
              </DropdownButton>
            </ButtonToolbar>
          </FormGroup>
          }
          { this.props.schema === 'PIE'&&
          <FormGroup onClick={this.props.handleMessageSchemaVersionIdChange}>
            <ButtonToolbar>
              <DropdownButton title={this.props.messageSchemaVersionId} bsSize="small" id="dropdown-size-small">
                {getDropDownOptions(this.pieMessageSchemaVersionIdList)}
              </DropdownButton>
            </ButtonToolbar>
          </FormGroup>
          }
          { !(this.props.messageSchemaVersionId === '3.4.1' || this.props.schema === 'RIN' || this.props.schema === 'MLC' || this.props.schema === 'MEAD' || this.props.schema === 'RDR-N' || this.props.schema === 'PIE') &&
            <FormGroup onClick={this.props.handleReleaseProfileVersionIdChange}>
              <ButtonToolbar className="custom-button">
                <DropdownButton title={this.props.releaseProfileVersionId} id="dropdown-size-small" bsSize="small">
                  {getReleaseProfileDropDownOptions(this.releaseProfileVersionIdList, this.props.messageSchemaVersionId)}
                </DropdownButton>
              </ButtonToolbar>
            </FormGroup>
          }
          &nbsp;
          <br/>
          <FormGroup>
            <ControlLabel/>
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
