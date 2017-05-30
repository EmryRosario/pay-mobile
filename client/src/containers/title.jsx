import React, {Component} from 'react'
import propTypes from 'prop-types'

class Title extends Component {
  render () {
    return <h3 className={'text-center text-primary'}>{this.props.description}</h3>
  }
}

Title.propTypes = {
  description: propTypes.string
}
export default Title
