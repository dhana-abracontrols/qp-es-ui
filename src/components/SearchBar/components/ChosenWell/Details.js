import React from 'react'
import PropTypes from 'prop-types'
import startCase from 'lodash/startCase'
import chunk from 'lodash/chunk'
import expandObject from '../../../../util/expandObject'

import Field from '../../../Field'

import Style from './Details.module.css'

const skipLabelRegExp = /^(?:next|prev|createddate)$/i
const dateRegExp = /date/i

const skipLabels = (label) => !skipLabelRegExp.test(label)
const renderValue = (label, value = 'null',search) => dateRegExp.test(label)
  ? {value : new Date(value).toUTCString() , query:search }
  : {value : value.toString(), query:search}

const Details = ({ well: { wellData,search } }) => {
  //const {search} = wellData
  //console.log(wellData)
  delete wellData.q
  const fields = Object.keys(wellData)
    .filter(skipLabels)
    .sort()
    .reduce((_accumulator, label) => {
      const accumulator = [..._accumulator]

      if (wellData[label] && typeof wellData[label] === 'object') {
        const expansion = expandObject(wellData[label], label)
        expansion.forEach(({ label, value }) => {
          wellData[label] = value
          accumulator.push(label)
        })
        delete wellData[label]
      } else {
        accumulator.push(label)
      }

      return accumulator
    }, [])
    .filter((label) => !!wellData[label])

  const rows = chunk(fields, 2)
    .map(([ leftLabel, rightLabel ]) =>
      <div key={`${leftLabel}-${rightLabel}`} className={Style.Row}>
        {
          leftLabel &&
          <Field className={Style.Field}
            label={startCase(leftLabel)}
            value={renderValue(leftLabel, wellData[leftLabel],search)} />
        }
        {
          rightLabel &&
          <Field className={Style.Field}
            label={startCase(rightLabel)}
            value={renderValue(rightLabel, wellData[rightLabel],search)} />
        }
      </div>
    )

  return (
    <div className={Style.Details}>
      { rows }
    </div>
  )
}

Details.propTypes = {
  well: PropTypes.object.isRequired
}

export default Details
