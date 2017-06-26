import React, {Component} from 'react'

class Footer extends Component {
  constructor (props) {
    super(props)

    this.onHandleSubmit = this.onHandleSubmit.bind(this)
  }
  render () {
    return (
      <div className={'modal-footer'}>
        <button type={'button'} id={`close-btn-${this.props.proofNumber}`} className={'btn btn-default'} data-dismiss={'modal'}>{'Close'}</button>
        <button type={'button'} className={'btn btn-primary'} disabled={this.props.proofState !== '1'} onClick={this.onHandleSubmit}>{'Aceptar'}</button>
      </div>)
  }

  onHandleSubmit (event) {
    event.preventDefault()

    this.props.handleSubmit()
  }
}

export default Footer
