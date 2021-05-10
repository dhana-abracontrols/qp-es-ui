// Query Park Inc. 2018

// This component renders the well options in a nice way

import React from 'react'
import PropTypes from 'prop-types'

import Field from '../../../Field'
import Pillbox from '../PillBox'

import Styles from './index.module.css'

const SearchOption = ({ innerRef, innerProps, data, selectOption }) => {
  const { primaryHeader, subheader, govId, surfaceLocation, owner } = data

  return (
    <div ref={innerRef}
      className={Styles.SearchOption}
      onClick={() => selectOption(data)}
      {...innerProps}>
      <div className={Styles.Row}>
        <Field valueEmphasis
          label={primaryHeader.label}
          value={primaryHeader.value} />
        <Field label={govId.label} value={govId.value} />
      </div>
      <div className={Styles.Row}>
        <Field label={subheader.label} value={subheader.value} />
        <Field label={surfaceLocation.label} value={surfaceLocation.value} />
      </div>
      <div className={Styles.Row}>
        <Field label={owner.label} value={owner.value} />
        <Pillbox attributes={data.attributes} />
      </div>
    </div>
  )
}

SearchOption.propTypes = {
  innerRef: PropTypes.func,
  innerProps: PropTypes.object.isRequired,

  data: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
  selectOption: PropTypes.func.isRequired
}

export default SearchOption
