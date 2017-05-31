import React, {Component} from 'react'
import Header from './containers/header.jsx'
import Content from './containers/content.jsx'
import PropTypes from 'prop-types'

class Proof extends Component {
  componentDidMount () {
    window.print()
  }
  render () {
    return (<div className={'col-xs-12 no-padding-left  no-padding-right'} id={`proof-${this.props.proof['REC_NUMERO']}`}>
      <Header proof={this.props.proof} company={this.props.company} client={this.props.client} />
      <Content proof={this.props.proof} user={this.props.user} />
    </div>)
  }
}

Proof.propTypes = {
  proof: PropTypes.array,
  company: PropTypes.array,
  client: PropTypes.array
}
export default Proof
