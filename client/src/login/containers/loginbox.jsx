import React, {Component} from 'react'
import propTypes from 'prop-types'

class Loginbox extends Component {
  render () {
    return (
      <div className={'login-box panel panel-default'}>
        <div className={'login-logo panel-heading'}>
          <a href={this.props.title.link}><b>{this.props.title.description}</b></a>
        </div>
        <div className={'login-box-body panel-body'}>
          {this.props.content}
        </div>
      </div>
    )
  }
}

Loginbox.propTypes = {
  title: propTypes.shape({
    link: propTypes.string,
    description: propTypes.string
  }),
  content: propTypes.element
}
export default Loginbox
