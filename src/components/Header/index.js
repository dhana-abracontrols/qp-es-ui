// Query Park Inc. 2018

// This component adds the header

import React from 'react'
import PropTypes from 'prop-types'

import Styles from './index.module.css'

const Header = ({ children }) =>
  <div className={Styles.Header}>
    { children }
  </div>

Header.propTypes = {
  children: PropTypes.object
}

export default Header
