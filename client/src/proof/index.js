import page from 'page'
import React from 'react'
import reactDOM from 'react-dom'
import Proof from './proof.jsx'
import axios from 'axios'

async function getCompany () {
  let company = await axios.get('/api/company')
  return company.data
}

async function getProof (proof) {
  let loan = await axios.get('/api/proof/loan', {
    params: {
      proof
    }
  })

  return loan.data
}

async function getClient (proof) {
  let client = await axios.get('/api/proof/client', {
    params: {
      proof
    }
  })

  return client.data
}

async function getUser () {
  let user = await axios.get('/api/user')

  return user.data
}
page('/proof/:id', async (ctx, next) => {
  let company = await getCompany()
  let proof = await getProof(ctx.params.id)
  let client = await getClient(ctx.params.id)
  let user = await getUser()
  console.log(company, proof, client)
  const mainContainer = document.getElementById('main-container')

  reactDOM.render((<Proof proof={proof} user={user} company={company} client={client} />), mainContainer)
})
