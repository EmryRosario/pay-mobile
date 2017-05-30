import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Searcher extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  render () {
    return (
      <div className={'searcher pull-right'}>
        <div className={'col-xs-10 col-md-10'}>
          <input type={'text'} className={'form-control search-input'} onChange={this.handleChange} value={this.props.searchText} />
        </div>
        <i className={'loans-search fa fa-search text-primary'} aria-hidden={'true'} />
      </div>
    )
  }

  handleChange (event) {
    event.preventDefault()
    this.props.handleChange(event.target.value)
  }
}

Searcher.propTypes = {
  searchText: PropTypes.string,
  handleChange: PropTypes.func
}
export default Searcher
