import page from 'page'
import reactDOM from 'react-dom'
import Loginbox from './containers/loginbox.jsx'
import LoginContent from './containers/login-content.jsx'
import React from 'react'

page('/login', (ctx, next) => {
  const mainContainer = document.getElementById('main-container')
  let title = {
    link: '/login',
    description: 'Cobros Movil'
  }
  reactDOM.render(<Loginbox title={title} content={<LoginContent />} />, mainContainer)
})
