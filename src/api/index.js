import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async(country) => {
    let changeableUrl = url
    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }
    try {
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);
        return {confirmed, recovered, deaths, lastUpdate}
    }
    catch (error) {
        console.log(error)
    }
}

export const fetchDailyNumber = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`)
        const usedDailyNumber = data.map((dailyNumber) => ({
            confirmed: dailyNumber.confirmed.total,
            deaths: dailyNumber.deaths.total,
            date: dailyNumber.reportDate
        }))
        return usedDailyNumber
    }
    catch (error) {
        console.log(error)
    }
}

export const fetchNumberByCountry = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`)
        return countries.map((country)=> country.name)
    }
    catch (error) {
    }
}