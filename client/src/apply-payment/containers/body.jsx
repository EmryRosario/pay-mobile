import React, {Component} from 'react'
import numeral from 'numeral'
import Footer from './footer.jsx'
import axios from 'axios'
import swal from 'sweetalert'

class Body extends Component {
  constructor (props) {
    super(props)

    this.state = {
      amountPayable: this.props.amountDue
    }
    this.amountPayableHandleChange = this.amountPayableHandleChange.bind(this)
    this.amountPayableHandleBlur = this.amountPayableHandleBlur.bind(this)
    this.applyPayment = this.applyPayment.bind(this)
    this.onHandleSubmit = this.onHandleSubmit.bind(this)
  }
  render () {
    return (
      <div>
        <div className={'modal-body'}>
          <form>
            <div className={'row'}>
              <div className='col-xs-12 col-md-6'>
                <div className={'form-group'}>
                  <label for={'ProofNumber'}>{'Numero Recibo: '}</ label >
                  <input type={'text'} className={'form-control'} readOnly value={this.props.proofNumber} />
                </div>

                <div className={'form-group'}>
                  <label for={'loanNumber'}>{'Numero Prestamo: '}</label>
                  <input type={'text'} className={'form-control'} readOnly value={this.props.loanNumber} />
                </div>

                <div className={'form-group'}>
                  <label for={'client'}>{'Cliente: '}</label>
                  <input type={'text'} className={'form-control'} value={this.props.clientName} readOnly />
                </div>
              </div>

              <div className={'colxs-12 col-md-6'}>

                <div className={'form-group'}>
                  <label for={'amoutDue'}>{'Monto Vencido:'}</label>
                  <input type={'text'} readOnly className={'form-control'}
                    value={numeral(this.props.amountDue).format('$ 0,0.00')} />
                </div>

                <div className={'form-group'}>
                  <label for={'amountPayable'}>{'Monto a Pagar: '}</label>
                  <input type={'text'} className={'form-control'} readOnly={this.props.proofState !== '1'} value={this.state.amountPayable}
                    onChange={this.amountPayableHandleChange}
                    onBlur={this.amountPayableHandleBlur} />
                </div>
              </div>
            </div>
          </form>
        </div>
        <Footer handleSubmit={this.onHandleSubmit} proofState={this.props.proofState} proofNumber={this.props.proofNumber} />
      </div>
    )
  }
  amountPayableHandleChange (event) {
    event.preventDefault()
    if (!isNaN(event.target.value.replace(/,/g, ''))) {
      this.setState({
        amountPayable: event.target.value
      })
    }
  }

  amountPayableHandleBlur (event) {
    this.setState((prevState) => ({
      amountPayable: numeral(prevState.amountPayable).format('0,0.00')
    }))
  }

  onHandleSubmit () {
    let payment = {
      amount: this.state.amountPayable,
      proof: this.props.proofNumber
    }
    this.applyPayment(payment)
    .then((result) => {
      console.log(result)
      if (result.error) return swal('Error', 'Ha ocurrido un error al aplicar el pago', 'error')
      document.getElementById(`close-btn-${this.props.proofNumber}`).click()
      swal('Exito', 'El pago ha sido aplicado correctamente.', 'success')
      this.openWindow('proof/' + this.props.proofNumber)
      window.location.reload()
    }
     )
  }

  async applyPayment (payment) {
    if (isNaN(payment.amount)) payment.amount = parseFloat(payment.amount.replace(/,/g, ''))

    if (payment.amount <= 0) return swal('Error!', 'Debe ingresar un monto valido', 'error')
    let result = await axios({
      method: 'PUT',
      url: '/api/payment',
      data: payment

    })

    return result.data
  }

  openWindow (url) {
    var a = document.createElement('a')
    a.target = '_blank'
    a.href = url
    a.click()
  }
}

export default Body
