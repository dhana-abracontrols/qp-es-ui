// Query Park Inc. 2018

// This component handles searching

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FetchWithTimeout from '../../util/FetchWithTimeout'

//import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async'

import { SearchOption, ChosenWell, WellsFound } from './components'
import ErrorDisplay from '../ErrorDisplay'

import Style from './index.module.css'

const axios = require('axios')
const { Headers } = window
const fetch = FetchWithTimeout(window.fetch)

const QP_URL_ROOT = 'http://localhost:9000/'

const createNewHeaders = (apiKey) => new Headers({
  'Content-Type': 'application/json',
  'x-api-key': apiKey
})

const DEFAULT_STATE = {
  well: {},
  showDetails: false,
  error: null
}

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = Object.assign({}, DEFAULT_STATE)
    this.state.inputValue = ''
    this.state.suggestedWells = []
    this.state.well = ''
    this.state.selectedCountry = [{value : 'US' ,label : 'US'},{value : 'CA' , label : 'CA'}]
    this.headers = createNewHeaders(props.API_KEY)
    this.onChange = this.onChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getWells = this.getWells.bind(this)
    this.reset = this.reset.bind(this)
    this.chosenWellHeader = this.chosenWellHeader.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  //  this.selectCountry = this.selectCountry.bind(this)
  }

  reset () {
    this.setState(DEFAULT_STATE)
    this.setState({inputValue  : '' , suggestedWells   : []})
    this.props.updateHeader(<h1>Well Search</h1>)
    this.props.updateFooter(<p />)
  }

  chosenWellHeader (chosenWell, showDetails = false) {
    this.props.updateHeader(<ChosenWell.Header well={chosenWell}
      clickDetails={this.handleClickDetails(chosenWell)}
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

  handleInputChange (e) {
    e.preventDefault()
    e.stopPropagation()
    
    this.setState({inputValue : e.target.value} , () => {
      this.setState({suggestedWells : []})
      this.getWells()
    })
    if (this.state.error) {
      this.setState({ error: null })
    }
  }

  handleClickDetails (chosenWell) {
    return () => {
      const showDetails = !this.state.showDetails
      this.setState({ showDetails })
      this.chosenWellHeader(chosenWell, showDetails)
    }
  }

  selectCountry = (newValue) => {
    this.setState({selectedCountry : newValue['value']}, () => {
      console.log(this.state.selectedCountry)
    })
  }

  async getWells () {
    if(this.state.inputValue !== '' && this.state.inputValue !== null){
      const query = `?query=${this.state.inputValue.replace(/[^A-Za-z0-9]/g, '')}`
      const url = QP_URL_ROOT + 'getSuggestwell'
      axios.get(url,{
        query : query
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
 
  showsuggestedwellsdivc(){
    return this.state.suggestedWells.map((well) => {
      return <SearchOption data = {well} selectOption = {this.onChange}/>
    })
  }

 
  
  onInputChange (val, action) {
    if (action.action === 'input-blur') {
      this.props.updateFooter(<p />)
    }
  }

  render () {
    const { well, showDetails, error } = this.state

    if (well.uuid) {
      return showDetails
        ? <ChosenWell.Details well={well} />
        : <ChosenWell well={well} />
    } else {
      return <>
        {/*<AsyncSelect className={Style.SearchBar}
                  components={{ Option: SearchOption }}
                  styles={{ menu: (_base, _style) => ({ margin: '5px 0 0' }) }}
                  backspaceRemovesValue={false}
                  onInputChange={this.handleInputChange}
                  getOptionLabel={(option) => option.primaryHeader.value}
                  getOptionValue={(option) => option.uuid}
                  cacheOptions={!error}
                  loadOptions={this.getWells}
                  onChange={this.onChange}
                  // remove filtering (this is already done by the api)
                  filterOption={null} />*/}
          <div className={Style.SearchBar}>  
          {/*<input type = 'text' autoFocus onFocus={e => e.currentTarget.select()} placeholder='Enter well name...' className={Style.ip2} name='search' id='search' value = {this.state.inputValue} onChange={this.handleInputChange}/>*/}
          <br />
          <Select  options = {this.state.selectedCountry} onChange = {this.selectCountry} >
          </Select>

          </div>
          <br />
          <br />
          {this.showsuggestedwellsdivc()}
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
  timeout: 2500
}

export default SearchBar
