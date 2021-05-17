// Query Park Inc. 2018

// This component renders the chosen well

import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Footer from './Footer'
import Details from './Details'

import Field from '../../../Field'
import Pillbox from '../PillBox'

import Style from './index.module.css'

const ChosenWell = ({ well }) => {
  const { subheader, govId, surfaceLocation, owner } = well

  return (
    <div className={Style.ChosenWell}>
      <div className={Style.Row}>
        <Field large
          className={Style.Field}
          label={subheader.label}
          value={subheader.value} />
        <Field large
          className={Style.Field}
          label={govId.label}
          value={govId.value} />
      </div>
      <div className={Style.Row}>
        <Field large
          className={Style.Field}
          label={surfaceLocation.label}
          value={surfaceLocation.value} />
        <Field large
          className={Style.Field}
          label={owner.label}
          value={owner.value} />
      </div>
      <div className={Style.Row}>
        <div /> { /* For flex justify-items: space-between */ }
        <Pillbox attributes={well.attributes} />
      </div>
    </div>
  )
}

ChosenWell.propTypes = {
  well: PropTypes.object.isRequired
}

ChosenWell.Header = Header
ChosenWell.Footer = Footer
ChosenWell.Details = Details

export default ChosenWell
