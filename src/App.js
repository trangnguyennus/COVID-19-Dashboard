import React from 'react'
import styles from './App.module.css'
import {Statistics, Graphs, Countries} from './components'
import { fetchData } from './api'
import covid19I from './images/covid19I.png'

class App extends React.Component {
  state = {
    data: {},
    country: ''
  }

  async componentDidMount () {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData})
  }

  handleCountryChange = async (country) => {
    console.log(country)
    const fetchedData = await fetchData(country);
    this.setState({data: fetchedData, country: country})
  }
  render() {
    const {data, country} = this.state;
    return(
      <div className={styles.container}>
        <img className={styles.img} src={covid19I} alt="Covid19"/>
        <Statistics data = {data}/>
        <Countries handleCountryChange = {this.handleCountryChange}/>
        <Graphs data={data} country={country} />

      </div>
    )
  }
}

export default App;