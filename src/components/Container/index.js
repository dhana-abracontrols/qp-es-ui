// Query Park Inc. 2018

// This component wraps the whole QP widget

import React from 'react'
import PropTypes from 'prop-types'

import Styles from './index.module.css'

const Container = ({ children, className }) => (
  <div className={`${Styles.Container} ${className}`}>
    { children }
  </div>
)

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array
}

export default Container
