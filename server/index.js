import express from 'express'
import path from 'path'
import engine from 'react-engine'
import bodyParser from 'body-parser'
import passport from 'passport'
import connection from './db.js'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import {Strategy as LocalStrategy} from 'passport-local'
import {ensureLoggedIn} from 'connect-ensure-login'
import Proof from '../client/src/proof/proof.jsx'
import React from 'react'
import reactDOMServer from 'react-dom/server'
import pdf from 'html-pdf'
import cors from 'cors'
import jwt from 'jsonwebtoken';
import bearerToken from 'express-bearer-token'

const app = express()

const privateKey = process.env.SESSION_KEY
const port = process.env.PORT || 7303
app.engine('.jsx', engine.server.create())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jsx')
app.set('view', engine.expressView)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(bearerToken())
app.use(express.static('public'))
app.use(expressSession({ secret: privateKey,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

connection.connect()

passport.use(new LocalStrategy(
  function (username, password, done) {
    connection.query(`SELECT USR_CIA,USR_CODIGO,USR_USUARI,USR_NOMBRE,USR_NIVEL FROM COBUSERS WHERE USR_ESTADO=1 AND USR_USUARI='${username}' AND USR_PASSWD='${password}'
      `, function (error, results) {
      if (error) {
        return done(error)
      }
      return done(null, results[0])
    })
  }
))

passport.serializeUser(function (user, done) {
  done(null, user['USR_CODIGO'])
})

passport.deserializeUser(function (id, done) {
  connection.query(`SELECT USR_CIA,USR_CODIGO,USR_USUARI,USR_NOMBRE,USR_NIVEL,USR_FVENCE FROM COBUSERS WHERE USR_ESTADO=1
      AND USR_CODIGO='${id}'
      `, function (error, results, fields) {
    if (error) return done(error)
    return done(null, results[0])
  })
})

function verifyToken (token) {
  return new Promise ((resolve, reject) => {
    jwt.verify(token, privateKey, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

app.get('/login', (req, res) => {
  res.render('layout')
})

app.post('/login',
  passport.authenticate('local', {failureRedirect: '/badlogin', failureFlash: false}), (req, res) => {
    
    jwt.sign({ user: req.user }, privateKey , null, function(err, token) {
      if (err) return res.json(null)
      console.log(token)
      return res.json(token);
    });
  })

app.get('/badlogin', (req, res) => {
  res.send(false)
})

app.get(['/', '/proof/:id'], ensureLoggedIn(), (req, res) => {
  res.render('layout')
})

app.put('/api/payment', async (req, res) => {
  let {amount, proof} = req.body
  
  if (!req.user && req.token) {
    let response = await verifyToken(req.token)
      req.user = response.user
  }
  if (req.user) {
    connection.query(`UPDATE COBRECIBOS SET REC_ESTADO=3, REC_MTOCOB=${amount}, REC_CODEMP=${req.user['USR_CODIGO']} WHERE REC_NUMERO=${proof}`,
  (error, results) => {
    if (error) return res.json({error: error})
    return res.json({error: null, result: results})
  })
  } else {
  res.status(401).json({})  
  }
})

app.get('/api/loans', (req, res) => {
  connection.query(`
      select REC_NUMERO, REC_CODPRE, REC_ESTADO, REC_MORA AS REC_MORPAG , REC_CUOTA AS REC_CUOPAG, CLI_NOMBRE, CLI_APELLI
       from COBRECIBOS
      INNER JOIN COBCLIENTES ON COBRECIBOS.REC_CODCLI = COBCLIENTES.CLI_CODIGO
       where REC_ESTADO=1 OR REC_ESTADO=3
    `, (error, results) => {
    if (error) return res.json({error})
    res.json(results)
  })
})

app.get('/api/company', (req, res) => {
  connection.query(`SELECT * FROM COBCIAS WHERE PAR_CIA=${req.user['USR_CIA']}`, (error, results) => {
    if (error) return res.json({error})
    res.json(results[0])
  })
})

app.get('/api/proof/loan', (req, res) => {
  connection.query(`SELECT * FROM COBRECIBOS WHERE REC_NUMERO=${req.query.proof}`, (error, results) => {
    if (error) return res.json({error})
    res.json(results[0])
  })
})

app.get('/api/proof/client', (req, res) => {
  connection.query(`SELECT COBCLIENTES.* FROM COBRECIBOS
    INNER JOIN COBCLIENTES ON COBRECIBOS.REC_CODCLI = COBCLIENTES.CLI_CODIGO
    WHERE REC_NUMERO=${req.query.proof}
    `, (error, results) => {
    if (error) return res.json({error})
    res.json(results[0])
  })
})

app.get('/api/user', (req, res) => {
  res.json(req.user)
})
app.get('/api/token/user', (req, res) => {
  verifyToken(req.token)
  .then((response) => res.json(response))
  .catch((err) => res.json(err)) 
})

app.get('/api/pdf/proof', (req, res) => {
  let proof = req.query

  let html = reactDOMServer.renderToStaticMarkup((
    <html>
      <head>
        <meta charSet={'UTF-8'} />
        <title>{'Cobro Movil'}</title>
        <link rel={'stylesheet'} href={'http://rcsistemasrd.com/index.css'} />
        <link rel={'stylesheet'} href={'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css'} />
      </head>
      <body>
        <Proof proof={JSON.parse(proof.proof)}
        user={JSON.parse(proof.user)} company={JSON.parse(proof.company)}
        client={JSON.parse(proof.client)} />
      </body>
    </html>
    ))

  var options = {
  format: 'Letter',
  height: "7in",
  width: "3in",
  type: 'pdf',
  border: '0',
  phantomPath: './node_modules/phantomjs/bin/phantomjs',
  phantomArgs: [],
  timeout: 30000,
 }

pdf.create(html, options).toFile('./public/proof-'+req.user['USR_USUARI']+'.pdf', function(err, resp) {
  if (err) return console.log(err)
  console.log(resp)
  console.log(req.user)
  res.send()
})

})
app.listen(5051, () => console.log(`Server listen on port ${port}...`))
