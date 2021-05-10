// Query Park Inc. 2021

// This component renders the time it took to search for wells

import React from 'react'
import PropTypes from 'prop-types'

import Style from './index.module.css'

const WellsFound = ({
  json: { payload: {
    totalwells: { length },
    queryTime
  } }
}) => <p className={Style.WellsFound}>
  {`${length} wells found in ${queryTime / 1000} seconds.`}
</p>

WellsFound.propTypes = {
  json: PropTypes.object.isRequired
}

export default WellsFound
