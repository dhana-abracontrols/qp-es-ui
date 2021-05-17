/* global API_KEY */

import React, { Component } from 'react'

import { Search } from 'qp-es-ui'

import Logo from './assets/Logo.png'

import Style from './App.module.css'

class App extends Component {
  constructor () {
    super()

    // If in development, the API_KEY may be supplied from a .env file
    // in qp-react-ui/.env
    // API_KEY=API_KEY. If in production, API_KEY is set to ''

    // This allows devs to skip copy pasting a key into the box every reload.
    this.state = { API_KEY }
    this.updateKey = this.updateKey.bind(this)
  }

  componentDidMount () {
    // * Temporarily by pass api key
    this.updateKey({ target: { value: 'temp' } })
  }

  updateKey (event) {
    const key = event.target.value
    this.setState({ API_KEY: key })
  }

  render () {
    const { API_KEY } = this.state

    const search = API_KEY
      ? <Search API_KEY={API_KEY} />
      : null

    return <>
      <header className={Style.Header}>
        <div>
          <img src={Logo} alt='Query Park' />
          <h1>Demo</h1>
        </div>
      </header>
      <main className={Style.Main}>
        {/* <section>
          <p>Enter Your API Key:</p>
          <input type='text' onChange={this.updateKey} />
        </section> */}
        <section>
          { search }
        </section>
      </main>
    </>
  }
}

export default App
