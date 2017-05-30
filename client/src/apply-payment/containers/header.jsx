import React, {Component} from 'react'

class Header extends Component {
  render () {
    return (<div className={'modal-header'}>
      <button type={'button'} className={'close'} data-dismiss={'modal'} aria-label={'Close'}><span aria-hidden={'true'}>&times;</span></button>
      <h4 className={'modal-title tex-primary text-center'}><span className={'text-primary'}>COBRAR PRESTAMO: </span>{this.props.client }</h4>
    </div>)
  }
}

export default Header
