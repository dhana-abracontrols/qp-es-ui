import React from 'react'
import PropTypes from 'prop-types'

import Field from '../../../Field'
import Button from '../../../Button'

import Style from './Header.module.css'

const Header = ({ well, clickDetails, showDetails }) => {
  const { primaryHeader, search } = well
  const primaryHeaderValue = {
    value: primaryHeader.value ? primaryHeader.value : null,
    query: search
  }
  return <>
    <Field large
      valueEllipsis
      labelEmphasis
      valueEmphasis
      label={primaryHeader.label}
      value={primaryHeaderValue} />
    <Button className={Style.Button} onClick={clickDetails}>
      {/* {showDetails ? 'Overview' : 'Details'} */}
      Export
    </Button>
  </>
}

Header.propTypes = {
  well: PropTypes.object.isRequired,
  clickDetails: PropTypes.func.isRequired,
  showDetails: PropTypes.bool
}

export default Header
