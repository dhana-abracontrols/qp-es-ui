import React from 'react'
import PropTypes from 'prop-types'
import Style from './index.module.css'
class Modal extends React.Component {
  render () {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null
    }

    return (
      <div className={Style.exactCenter}>
        <div>
          <div className='chartModalHeader'>{'Success'}</div>
          <div>{this.props.children}</div>
          <div className='chartModalFooter'>
            {this.props.onClose ? (<button className='btn btn-default' id='modalClose' onClick={this.props.onClose}>Close </button>) : ''}
          </div>

        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
}

export default Modal
