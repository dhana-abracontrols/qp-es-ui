// Query Park Inc. 2020

// This component renders the well options in a nice way

import React from 'react'
import PropTypes from 'prop-types'
import Field from '../../../Field'
import Pillbox from '../PillBox'

import Styles from './index.module.css'

const SearchOption = ({ data, selectOption }) => {
  const { primaryHeader, subheader, govId, surfaceLocation, owner, search } = data
  // console.log(search)
  const primaryHeaderValue = {
    value: primaryHeader.value ? primaryHeader.value : null,
    query: search
  }
  const subHeaderValue = {
    value: subheader.value ? subheader.value : null,
    query: search
  }
  const surfaceLocationValue = {
    value: surfaceLocation.value ? surfaceLocation.value : null,
    query: search
  }
  const govIdValue = {
    value: govId.value ? govId.value : null,
    query: search
  }
  const ownerValue = {
    value: owner.value ? owner.value : null,
    query: search
  }
  return (
    <div
      className={Styles.SearchOption}
      onClick={() => selectOption(data)}
    >
      <div className={Styles.Row}>
        <Field valueEmphasis
          label={primaryHeader.label}
          value={primaryHeaderValue} />
        <Field label={govId.label} value={govIdValue} />
      </div>
      <div className={Styles.Row}>
        <Field label={subheader.label} value={subHeaderValue} />
        <Field label={surfaceLocation.label} value={surfaceLocationValue} />
      </div>
      <div className={Styles.Row}>
        <Field label={owner.label} value={ownerValue} />
        <Pillbox attributes={data.attributes} />
      </div>
    </div>
  )
}

SearchOption.propTypes = {
  data: PropTypes.object.isRequired,
  selectOption: PropTypes.func.isRequired
}

export default SearchOption
