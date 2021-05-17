import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../../Button'

const Footer = ({ reset }) => <Button onClick={reset}>Back</Button>

Footer.propTypes = {
  reset: PropTypes.func.isRequired
}

export default Footer
