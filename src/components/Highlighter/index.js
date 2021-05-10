import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Style from './index.module.css'

const Highlighter = ({children, highlight}) => {
    if (!highlight) return children;
    const regexp = new RegExp(highlight, 'g');
    const matches = children.match(regexp);
    console.log(matches, parts);
    var parts = children.split(new RegExp(`${highlight.replace()}`, 'g'));
  
    for (var i = 0; i < parts.length; i++) {
      if (i !== parts.length - 1) {
        let match = matches[i];
        // While the next part is an empty string, merge the corresponding match with the current
        // match into a single <span/> to avoid consequent spans with nothing between them.
        while(parts[i + 1] === '') {
          match += matches[++i];
        }
  
        parts[i] = (
          <React.Fragment key={i}>
            {parts[i]}<span className= {Style.highlighted}>{match}</span>
          </React.Fragment>
        );
      }
    }
    return <div className="highlighter">{parts}</div>;
  }

  export default Highlighter