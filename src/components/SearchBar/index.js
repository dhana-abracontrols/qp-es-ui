// Query Park Inc. 2020

// This component handles searching

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FetchWithTimeout from '../../util/FetchWithTimeout'
import dataToExcel from '../../util/exportToExcel'
import parse from '../../util/parse'
import groupBy from '../../util/groupBy'
import { SearchOption, ChosenWell, WellsFound } from './components'
import ErrorDisplay from '../ErrorDisplay'
import Modal from '../Modal'
import Style from './index.module.css'
import ReactTable from 'react-table-v6'

const { Headers } = window
const fetch = FetchWithTimeout(window.fetch)

const QP_URL_ROOT = 'https://api.querypark.com/v1/'

const createNewHeaders = (apiKey) => new Headers({
  'Content-Type': 'application/json',
  'x-api-key': apiKey
})

const DEFAULT_STATE = {
  well: {},
  showDetails: true,
  error: null,
  confirmationModal: false,
  confirmationMessage: 'File created.'
}

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = Object.assign({}, DEFAULT_STATE)
    this.state.inputValue = ''
    this.state.suggestedWells = []
    this.headers = createNewHeaders(props.API_KEY)
    this.onChange = this.onChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getWells = this.getWells.bind(this)
    this.reset = this.reset.bind(this)
    this.chosenWellHeader = this.chosenWellHeader.bind(this)
    this.exportExcel = this.exportExcel.bind(this)
    this.handleConfirmationOk = this.handleConfirmationOk.bind(this)
  }

  handleConfirmationOk () {
    this.setState({ confirmationModal: !this.state.confirmationModal })
  }

  reset () {
    this.setState(DEFAULT_STATE)
    this.props.updateHeader(<h1>Well Search</h1>)
    this.props.updateFooter(<p />)
  }

  chosenWellHeader (chosenWell, showDetails = true) {
    this.props.updateHeader(<ChosenWell.Header well={chosenWell}
      clickDetails={() => this.handleClickDetails(chosenWell)}
      showDetails={showDetails}
    />)
  }

  onChange (chosenWell) {
    this.chosenWellHeader(chosenWell)
    this.props.updateFooter(<ChosenWell.Footer reset={this.reset} />)

    this.setState({ well: chosenWell })

    if (typeof this.props.onWellSelect === 'function') {
      this.props.onWellSelect(chosenWell)
    }
  }

  async handleClickDetails (chosenWell) {
    Object.assign(chosenWell, { 'search': this.state.inputValue })
    let parsedJson = await parse(chosenWell)
    let parsedObject = [{ key: chosenWell.wellData.Region, value: parsedJson }]
    let fileCreated = await dataToExcel(parsedObject)
    if (fileCreated) {
      this.setState({ confirmationModal: !this.state.confirmationModal })
    }
    return () => {
      const showDetails = !this.state.showDetails
      this.setState({ showDetails })
      this.chosenWellHeader(chosenWell, showDetails)
    }
  }

  async getWells () {
    if (this.state.inputValue !== '' && this.state.inputValue !== null) {
      const query = `?query=${this.state.inputValue.replace(/[^A-Za-z0-9]/g, '')}`
      const url = QP_URL_ROOT + 'suggest' + query

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: this.headers
        }, this.props.timeout)

        const json = await response.json()

        if (!json.ok) {
          throw new Error(json.message)
        }

        const wells = json.payload.wells
        this.setState({ suggestedWells: wells })
        this.props.updateFooter(<WellsFound json={json} />)
        return wells
      } catch (error) {
        this.setState({ error })
        return []
      }
    }
  }

  handleInputChange (e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ inputValue: e.target.value }, () => {
      this.setState({ suggestedWells: [] })
      this.getWells()
    })
    if (this.state.error) {
      this.setState({ error: null })
    }
  }

  showsuggestedwellstable () {
    // console.log(this.state.suggestedWells)
    if (this.state.suggestedWells.length > 0) {
      const data = this.state.suggestedWells.map((well) => {
        Object.assign(well, { 'search': this.state.inputValue })
        return ({ wellname: <SearchOption data={well} selectOption={this.onChange} /> })
      })
      const columns = [{
        Header: '',
        accessor: 'wellname',
        minWidth: 500
      }]
      return (<><div className={Style.SearchOption} style={{ width: '100px', align: 'right' }}><button style={{ backgroundColor: 'lightblue' }} onClick={this.exportExcel}>Export</button></div><div className={Style.SearchOption}>  <ReactTable loadingText={' '} columns={columns} data={data} /> </div></>)
    }
  }
  async exportExcel (e) {
    e.preventDefault()
    let jsonObject = this.state.suggestedWells
    // console.log(jsonObject[0])
    let groupedObject = groupBy(jsonObject, jsonObject => jsonObject.wellData.Region)
    // console.log(groupedObject)

    let parsedObject = []
    for (let [k, value] of groupedObject.entries()) {
      // console.log(k,value.length,value[0])
      let parsedJson = await parse(value)
      parsedObject.push({ key: k, value: parsedJson })
    }
    // console.log(parsedObject)
    let fileCreated = await dataToExcel(parsedObject)
    if (fileCreated) {
      this.setState({ confirmationModal: !this.state.confirmationModal })
    }
  }

  render () {
    const { well, showDetails, error } = this.state

    if (well.uuid) {
      return showDetails
        ? <><ChosenWell.Details well={Object.assign(well, { 'search': this.state.inputValue })} />
          <Modal show={this.state.confirmationModal}>
            <div>
              {this.state.confirmationMessage}
            </div>
            <button type='button' className='btn btn-danger' onClick={this.handleConfirmationOk}> Ok </button>
          </Modal>
        </>
        : <ChosenWell well={Object.assign(well, { 'search': this.state.inputValue })} />
    } else {
      return <>
        <div className={Style.SearchBar}>
          <input type='text' autoFocus onFocus={e => e.currentTarget.select()} placeholder='Search...' className={Style.ip2} name='search' id='search' value={this.state.inputValue} onChange={this.handleInputChange} />
        </div>
        <br />
        <br />
        <br />
        {this.showsuggestedwellstable()}
        <Modal show={this.state.confirmationModal}>
          <div>
            {this.state.confirmationMessage}
          </div>
          <button type='button' className='btn btn-danger' onClick={this.handleConfirmationOk}> Ok </button>
        </Modal>
        {
          error &&
          <ErrorDisplay error={error} />
        }
      </>
    }
  }
}

SearchBar.propTypes = {
  API_KEY: PropTypes.string.isRequired,
  onWellSelect: PropTypes.func,
  timeout: PropTypes.number,

  updateHeader: PropTypes.func.isRequired,
  updateFooter: PropTypes.func.isRequired
}

SearchBar.defaultProps = {
  timeout: 5000
}

export default SearchBar
