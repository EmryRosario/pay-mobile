import React, {Component} from 'react'
import PropTypes from 'prop-types'
class ApplyPayment extends Component {
  render () {
    return (<div className={'modal fade'} id={'modal-' + this.props.proofNumber} tabIndex={'-1'} role={'dialog'}>
      <div className={'modal-dialog'} role={'document'}>
        <div className={'modal-content'}>
          {this.props.header}
          {this.props.body}
          {this.props.footer}
        </div>
      </div>
    </div>)
  }
}

ApplyPayment.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  footer: PropTypes.element
}
export default ApplyPayment
