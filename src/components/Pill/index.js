// Query Park Inc. 2018

// This component renders a pill

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Styles from './index.module.css'

const Pill = ({ children, style, className }) =>
  <div style={style}
    className={classNames(className, Styles.Pill)}>
    { children }
  </div>

Pill.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

export default Pill
