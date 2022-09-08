import React from 'react';

import { Modal } from 'react-bootstrap';

class LoadingModal extends React.Component {

  componentDidMount() {
    if (document && document.body) {
      var orig = document.body.className;
      document.body.className = orig + (orig ? ' ' : '') + 'loading-modal-open';
    }
  }

  componentWillUnmount() {
    if (document && document.body) {
      document.body.className = document.body.className.replace('loading-modal-open', '').trim();
    }
  }

  render() {
    return (
      <div className="loading-modal">
        <Modal.Dialog className="loading-modal-child">
          <Modal.Body>
            <div className="loader"></div>Loading...
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
  }
}

export default LoadingModal;