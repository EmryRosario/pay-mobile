import page from 'page'
import LoanList from './containers/index.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

page('/', async (ctx, next) => {
  let props = {
    titles: [
      'Numero Recibo',
      'Numero Prestamo',
      'Nombre',
      'Monto a Pagar',
      ''
    ]
  }
  props.loans = await getLoans()
  ReactDOM.render(<LoanList {...props} />, document.getElementById('main-container'))
})
async function getLoans () {
  let loans = await axios.get('/api/loans')
  return loans.data
}
