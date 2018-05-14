import React, {Component} from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import page from 'page'

class LoginContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  render () {
    return (<form>
      <div className={'row'}>
        <div className={'col-xs-12'}>
          <div className={'form-group has-feedback'}>
            <input type={'text'} id={'login-user'} onChange={this.handleChange} name={'user'} className={'form-control'} value={this.state.user} />
            <span className={'glyphicon glyphicon-envelope form-control-feedback'} />
          </div>
          <div className={'form-group has-feedback'}>
            <input type={'password'} id={'login-password'} onChange={this.handleChange} name={'password'} className={'form-control'} value={this.state.password} />
            <span className={'glyphicon glyphicon-lock form-control-feedback'} />
          </div>
        </div>
        <div className={'col-xs-4 pull-right'}>
          <button onClick={this.handleSubmit} className={'btn btn-primary btn-block btn-flat'}>{'Entrar'}</button>
        </div>
      </div>
    </form>)
  }

  handleSubmit (event) {
    event.preventDefault()

    let user = {
      username: this.state.user,
      password: this.state.password
    }

    axios.post('/login', user)
    .then((result) => {
      if (!result.data) return swal('Error', 'Usuario y/o contraseña incorrecto.', 'error')
      return page.redirect('/')
    })
  }

  handleChange (event) {
    let name = event.target.name
    let value = event.target.value
    this.setState({
      [name]: value
    })
  }
}

export default LoginContent
