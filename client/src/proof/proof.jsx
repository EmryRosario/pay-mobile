import React, {Component} from 'react'
import Header from './containers/header.jsx'
import Content from './containers/content.jsx'
import PropTypes from 'prop-types'

class Proof extends Component {
  componentDidMount () {
    window.print()
  }
  render () {
    if (this.props.proof['REC_ESTADO'] !== '3') {
      return (<div className={'jumbotron col-xs-8 col-x-offset-2'}><h4>{'No se ha aplicado ningun pago.'}</h4></div>)
    }
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
