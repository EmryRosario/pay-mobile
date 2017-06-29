import React, {Component} from 'react'
import Title from '../../containers/title.jsx'
import LoanTitle from './loan-title.jsx'
import Loan from './loan.jsx'
import Searcher from './searcher.jsx'

import PropTypes from 'prop-types'
class LoanList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loans: this.props.loans,
      searchText: ''
    }
    this.onSearcherHandleChange = this.onSearcherHandleChange.bind(this)
    this.loansFilter = this.loansFilter.bind(this)
  }

  render () {
    console.log(this.props.loans)
    return (<div className={'row'}>
      <div className={'col-xs-12'}>
        <Title description={'Listado Recibos a cobrar'} />
        <Searcher handleChange={this.onSearcherHandleChange} searchText={this.state.searchText} className={'pull-right'} />
        <table className={'table loans-table table-hover'}>
          <thead>
            <LoanTitle titles={this.props.titles} />
          </thead>
          <tbody>
            {this.state.loans.map(loan => {
              return (
                <Loan key={loan['REC_NUMERO']} loan={loan} />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>)
  }

  onSearcherHandleChange (text) {
    this.setState((prevState, prevProps) => {
      let trueFilter = this.loansFilter(text)
      return { searchText: text,
        loans: prevProps.loans.filter(trueFilter)
      }
    })
  }

  loansFilter (text) {
    let filtering = (loan) => {
      text = text.toUpperCase()
      if (text === '' || loan['REC_NUMERO'].toString().search(text) >= 0 ||
      loan['REC_CODPRE'].toString().search(text) >= 0 ||
       `${loan['CLI_NOMBRE']} ${loan['CLI_APELLI']}`.toUpperCase().search(text) >= 0 ||
        (loan['REC_CUOPAG'] + loan['REC_MORPAG']).toString().search(text) >= 0
      ) {
        return true
      }
    }
    filtering = filtering.bind(this)
    return filtering
  }
}

LoanList.propTypes = {
  titleList: PropTypes.array,
  loans: PropTypes.array
}
export default LoanList
