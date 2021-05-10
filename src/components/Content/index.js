// Query Park Inc. 2018

// This component wraps the search interaction

import React from 'react'
import PropTypes from 'prop-types'

import Style from './index.module.css'

const Content = ({ children }) =>
  <div className={Style.Container}>
    { children }
  </div>

Content.propTypes = {
  children: PropTypes.object
}

export default Content
