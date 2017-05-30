import React, {Component} from 'react'
import PropTypes from 'prop-types'

class loanTitle extends Component {
  render () {
    let loanTitles = this.props.titles.map(title => <th key={title}>{title}</th>)

    return (<tr>
      {loanTitles}
    </tr>)
  }
}

loanTitle.propTypes = {
  titles: PropTypes.array
}

export default loanTitle
