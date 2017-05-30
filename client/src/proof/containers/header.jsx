import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Header extends Component {

  render () {
    let date = new Date()
    return (<div id={`proof-header-${this.props.proof['REC_NUMERO']}`} className={'col-xs-12 border-bottom no-padding-right no-padding-left'}>
      <div id={'address-info'} className={'col-xs-12 text-center no-padding-left '}>
        <div className={'col-xs-12 text-center'}><span>{this.props.company['PAR_NOMEMP']} </span></div>
        <div className={'col-xs-12 text-left'}><span>{this.props.company['PAR_DIRECC']}</span></div>
        <div className={'col-xs-12 text-left'}><span>{this.props.company['PAR_SECTOR']}</span></div>
        <div className={'col-xs-12 text-left'}><span>{`TEL: ${this.props.company['PAR_TELEFO']}`}</span></div>
        <div className={'col-xs-12 text-center'}><span>{`RECIBO`}</span></div>
        <div className={'col-xs-12 text-left'}><span><br />
          {`RECIBIMOS DE:  ${this.props.client['CLI_NOMBRE']} ${this.props.client['CLI_APELLI']}  `}</span>
        </div>
        <br />
        <div className={'col-xs-6 text-left'}><span>{`FECHA:  ${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`}</span></div>
        <div className={'col-xs-6 text-right'}><span>{`RECIBO NO.: ${this.props.proof['REC_NUMERO']}`}</span></div>
        <div className={'col-xs-6 text-left'}><span>{`PRESTAMO.: ${this.props.proof['REC_CODPRE']} `}</span></div>
        <div className={'col-xs-6 text-right'}><span>{`No. DE CUOTAS: ${this.props.proof['COB_CUOTAS']}`}</span></div>

        <div className={'col-xs-12 text-left form-group proof-space'}><span>{'CALLE: '} {this.props.client['CLI_CALLE']} </span></div>
        <div className={'col-xs-12 text-left'}><span>{'NUM: '}{this.props.client['CLI_NUMERO']}</span></div>
        <div className={'col-xs-12 text-left'}><span>{'SEC.: '}{this.props.client['CLI_SECTOR']}</span></div>
        <div className={'col-xs-12 text-left'}>
          <span>{'TELS.: '}{`${this.props.client['CLI_TELEFO']}   ${this.props.client['CLI_2TELEF']}`}</span>
        </div>
        <div className={'col-xs-12 text-left'}>
          <span>{'CEL.: '}{`${this.props.client['CLI_CELULA']}`}</span>
        </div>
      </div>
    </div>)
  }

}
Header.propTypes = {
  proof: PropTypes.array,
  client: PropTypes.array,
  company: PropTypes.array
}
export default Header
