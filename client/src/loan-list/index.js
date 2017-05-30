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
    ],
    loans: [
      {
        'REC_NUMERO': 1234,
        'REC_CODPRE': 15632,
        'REC_NOMBRE': 'Emry',
        'REC_MORPAG': 25615,
        'REC_CUOPAG': 256156
      }, {
        'REC_NUMERO': 12435,
        'REC_CODPRE': 156,
        'REC_NOMBRE': 'Emry',
        'REC_MORPAG': 25615,
        'REC_CUOPAG': 256156
      }, {
        'REC_NUMERO': 12546,
        'REC_CODPRE': 156,
        'REC_NOMBRE': 'Emry',
        'REC_MORPAG': 25615,
        'REC_CUOPAG': 256156
      }, {
        'REC_NUMERO': 12456,
        'REC_CODPRE': 15654,
        'REC_NOMBRE': 'Emry',
        'REC_MORPAG': 25615,
        'REC_CUOPAG': 256156
      }

    ]
  }
  props.loans = await getLoans()
  ReactDOM.render(<LoanList {...props} />, document.getElementById('main-container'))
})
async function getLoans () {
  let loans = await axios.get('/api/loans')
  return loans.data
}
