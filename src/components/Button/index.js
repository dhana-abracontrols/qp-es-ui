// Query Park Inc. 2018

// This component renders a button

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Style from './index.module.css'

const Button = ({ onClick, children, className }) =>
  <button className={classNames(className, Style.Button)}
    onClick={onClick}>
    { children }
  </button>

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
  className: PropTypes.string
}

export default Button
