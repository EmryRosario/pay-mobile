import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ApplyPaymentHeader from '../../apply-payment/containers/header.jsx'
import ApplyPaymentBody from '../../apply-payment/containers/body.jsx'
import ApplyPayment from '../../apply-payment/index.jsx'
import numeral from 'numeral'

class Loan extends Component {
  render () {
    let loan = this.props.loan

    let modalHeader = <ApplyPaymentHeader client={`${loan['CLI_NOMBRE']} ${loan['CLI_APELLI']}`} />
    let modalBody = <ApplyPaymentBody proofNumber={loan['REC_NUMERO']} loanNumber={loan['REC_CODPRE']}
      clientName={`${loan['CLI_NOMBRE']} ${loan['CLI_APELLI']}`}
      amountDue={loan['REC_CUOPAG'] + loan['REC_MORPAG']}
              />

    return (<tr>
      <td>{loan['REC_NUMERO']}</td>
      <td>{loan['REC_CODPRE']}</td>
      <td>{`${loan['CLI_NOMBRE']} ${loan['CLI_APELLI']}`}</td>
      <td>{numeral(loan['REC_CUOPAG'] + loan['REC_MORPAG']).format('$ 0,0.00')}</td>
      <td>
        <a href={'#'} data-toggle={'modal'} data-target={'#modal-' + loan['REC_NUMERO']}><i className='payment-button fa fa-money' aria-hidden='true' /></a>
        <a href={'/proof/' + loan['REC_NUMERO']} target={'_blank'}><i className='consult-button fa fa-book' aria-hidden='true' /></a>
        <ApplyPayment proofNumber={loan['REC_NUMERO']} header={modalHeader} body={modalBody} />

      </td>
    </tr>)
  }

}

Loan.propTypes = {
  loans: PropTypes.shape({
    'REC_NUMERO': PropTypes.number,
    'REC_MTOCUO': PropTypes.number,
    'REC_CUOPAG': PropTypes.number,
    'REC_MORPAG': PropTypes.number,
    'REC_CODPRE': PropTypes.number,
    'CLI_NOMBRE': PropTypes.string,
    'CLI_APELLI': PropTypes.string
  })
}
export default Loan
