import React, {Component} from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'

class Content extends Component {

  render () {
    let date = new Date()
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

    let mora = (this.props.proof['REC_MTOCOB'] - this.props.proof['REC_MORA']) >= 0
    ? this.props.proof['REC_MORA']
    : this.props.proof['REC_MTOCOB']

    let cuota = this.props.proof['REC_MTOCOB'] > mora ? this.props.proof['REC_MTOCOB'] - mora : 0

    this.props.proof['REC_DESCRI'] = this.props.proof['REC_DESCRI'] || '...................'

    return (<div id={`proof-content-${this.props.proof['REC_NUMERO']}`} className={'col-xs-12  no-padding-right no-padding-left'}>
      <div className={'col-xs-12 text-center no-padding-left'}>
        <div className={'col-xs-6 text-left'}><span>{`CONCEPTO...: `}</span></div>
        <div className={'col-xs-6 text-left'}><span>{'PAGO POR DESEMBOLSO'}</span></div>
        <div className={'col-xs-6 text-left'}><span>{`CUOTA...: `}</span></div>
        <div className={'col-xs-6 text-left'}><span>
          {numeral(cuota).format('$ 0,0.00')}
        </span></div>
        <div className={'col-xs-6 text-left'}><span>{`MORA...: `}</span></div>
        <div className={'col-xs-6 text-left'}><span>{
          numeral(mora).format('$ 0,0.00')
          }</span></div>
        <div className={'col-xs-6 text-left'}><span>{`OTROS ING...: `}</span></div>
        <div className={'col-xs-6 text-left'}><span>{numeral(this.props.proof['REC_INGRES']).format('$ 0,0.00')}</span></div>
        <div className={'col-xs-6 text-left'}><span>{`DESCUENTO...: `}</span></div>
        <div className={'col-xs-6 text-left'}><span>{numeral(this.props.proof['REC_DESCUE']).format('$ 0,0.00')}</span></div>
        <div className={'col-xs-4 col-xs-offset-6 text-left border-bottom'} />
        <div className={'col-xs-6 text-left'}><span>{'TOTAL.....:'}</span></div>
        <div className={'col-xs-6 text-left'}><span>
          {numeral(this.props.proof['REC_MTOCOB']).format('$ 0,0.00')}
        </span></div>
        <div className={'col-xs-12 border-bottom'} />
        <div className={'col-xs-6 text-left'}>{'IMPRESO POR:'}</div>
        <div className={'col-xs-6 text-left'}>{this.props.user['USR_USUARI']}</div>
        <div className={'col-xs-6 text-left'}>{'FECHA..: '}</div>
        <div className={'col-xs-6 text-left'}>{`${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()} `} {`${hour}:${minutes}:${seconds}`}</div>
      </div>
    </div>)
  }

}

Content.propTypes = {
  proof: PropTypes.array
}
export default Content
