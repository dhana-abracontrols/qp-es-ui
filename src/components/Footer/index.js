// Query Park Inc. 2018

// This component adds the footer, including a powered by qp message

import React from 'react'
import PropTypes from 'prop-types'

import Style from './index.module.css'

const Footer = ({ children }) => (
  <div className={Style.Footer}>
    <div>
      { children }
    </div>
    <h6 className={Style.Tag}>
      { 'POWERED BY ' }
      <a href='https://www.querypark.com'
        rel='noopener noreferrer'
        target='_blank'>
          QUERY PARK INC.
      </a>
    </h6>
  </div>
)

Footer.propTypes = {
  children: PropTypes.object
}

export default Footer
