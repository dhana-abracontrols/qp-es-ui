// Query Park Inc. 2018

// This component renders attributes as an array of pills

import React from 'react'
import PropTypes from 'prop-types'

import Pill from '../../../Pill'

import Style from './index.module.css'

const Pillbox = ({ attributes }) => {
  const { region, drillDirection, isLatest } = attributes

  const regionPill = (region)
    ? <Pill key={region} className={Style[region]}>{region}</Pill>
    : null
  const drillDirectionPill = (drillDirection)
    ? <Pill key={drillDirection} className={Style[drillDirection]}>{drillDirection}</Pill>
    : null
  const latestPill = (isLatest)
    ? <Pill key='latest' className={Style.Latest}>Latest</Pill>
    : <Pill key='historical' className={Style.Historical}>Hist</Pill>

  return (
    <div className={Style.PillBox}>
      { regionPill }
      { drillDirectionPill }
      { latestPill }
    </div>
  )
}

Pillbox.propTypes = {
  attributes: PropTypes.object.isRequired
}

export default Pillbox
