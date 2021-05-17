// Query Park Inc. 2020

// This component renders a field with a stylized label

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Style from './index.module.css'

const getHighlightedText = (text, highlight) => {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.toString().split(new RegExp(`(${highlight})`, 'gi'))
  return <span> { parts.map((part, i) =>
    <span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? Style.highlighted : ''}>
      { part }
    </span>)
  } </span>
}

const Field = ({
  className,
  large,
  valueEmphasis,
  labelEllipsis,
  labelEmphasis,
  valueEllipsis,
  label,
  value
}) => {
  const ContainerStyle = classNames({
    [Style.Container]: labelEllipsis || valueEllipsis
  }, className)
  const LabelStyle = classNames({
    [Style.LabelLarge]: large,
    [Style.LabelSmall]: !large,
    [Style.Emphasis]: labelEmphasis,
    [Style.Ellipsis]: labelEllipsis
  })
  const ValueStyle = classNames({
    [Style.ValueLarge]: large,
    [Style.ValueSmall]: !large,
    [Style.Emphasis]: valueEmphasis,
    [Style.Ellipsis]: valueEllipsis
  })
  return (
    <div className={ContainerStyle}>
      <h2 className={LabelStyle}>{ label }</h2>
      {/* <p className={ValueStyle}>{ value }</p> */}
      {value.value !== null ? getHighlightedText(value.value, value.query) : <p className={ValueStyle}>{ value.value }</p>}
    </div>
  )
}

Field.propTypes = {
  className: PropTypes.string,
  large: PropTypes.bool,
  valueEmphasis: PropTypes.bool,
  valueEllipsis: PropTypes.bool,
  labelEmphasis: PropTypes.bool,
  labelEllipsis: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.object
}

Field.defaultProps = {
  value: 'None'
}

export default Field
