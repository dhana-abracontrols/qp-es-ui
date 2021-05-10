import React from 'react'
import PropTypes from 'prop-types'

import Style from './index.module.css'

function ErrorDisplay ({ raw, error }) {
  const message = raw
    ? `${error.name}: ${error.message}`
    : `There was a problem getting the wells. (${error.name})`

  return <div className={Style.ErrorDisplay}>
    <span>
      {message}
    </span>
  </div>
}

ErrorDisplay.propTypes = {
  error: PropTypes.object.isRequired,
  raw: PropTypes.bool
}

export default ErrorDisplay
