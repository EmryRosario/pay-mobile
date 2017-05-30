import React, {Component} from 'react'

export default class Layout extends Component {
  render () {
    return (
      <html lang={'es'}>
        <head>
          <meta charSet={'UTF-8'} />
          <title>{'Cobro Movil'}</title>
          <link rel={'stylesheet'} href={'/index.css'} />
          <link rel={'stylesheet'} href={'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css'} />
          <link rel={'stylesheet'} href={'./dist/css/AdminLTE.min.css'} />
        </head>
        <body>
          <div id={'header-container'} />
          <div id={'main-container'} />
          <div id={'footer-container'} />
          <script src={'/index.js'} />
          <script src={'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'} />
          <script src={'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js'} />
        </body>
      </html>
    )
  }
}
