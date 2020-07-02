import React, {useState, useEffect} from 'react';
import { fetchDailyNumber } from '../../api'
import {Line, Pie} from 'react-chartjs-2'
import styles from './Graphs.module.css'

const Graphs = ({data : {confirmed, recovered, deaths}, country}) => {
    const [dailyNumber, setDailyNumber] = useState([])

    useEffect(() => {
        const fetchDailyAPI = async () => {
            setDailyNumber(await fetchDailyNumber())
        }
        // console.log(dailyNumber)
        fetchDailyAPI()
    },[])
 
    const lineChart = (
        dailyNumber.length ? (
        <Line
        data = {{
            labels: dailyNumber.map(({ date })=> date),
            datasets: [{
                data: dailyNumber.map(({confirmed}) => confirmed),
                label: 'TOTAL CASES',
                borderColor: '#3333ff',
                fill: true
            },
            {
                data: dailyNumber.map(({deaths}) => deaths),
                label: 'DECEASED',
                borderColor: 'rgb(128,39,9)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true
            }]
        }}
        options= {{
            title: {display: true,
                    text: `Current figures of Covid-19 in the world`,
                    fontSize: 20,
                    fontStyle: 'bold',
            }
        }}
        />
        ) : null
    )
    
    const pieChart = (
        confirmed ?
        (
            <Pie
            data= {{
                labels: [
                    'Total Cases',
                    'Active Cases',
                    'Discharged',
                    'Deceased'
                ],
                datasets: [{
                    data: [confirmed.value, confirmed.value-recovered.value-deaths.value ,recovered.value, deaths.value],
                    backgroundColor: [
                        'rgb(0,0,255)',
                        'rgb(127,15,135)',
                        'rgb(44,143,27)',
                        'rgb(128,39,9)'
                    ],
                    hoverBackgroundColor: [
                        'rgb(0,0,255)',
                        'rgb(127,15,135)',
                        'rgb(44,143,27)',
                        'rgb(128,39,9)'
                    ]
                }],
            }}
            options= {{
                title: {display: true,
                        text: `Current figures of Covid-19 in ${country}`,
                        fontSize: 20,
                        fontStyle: 'bold',
                }
            }}
            />
        ) :null
    )

    return (
        <div className={styles.container}>
            {country ? pieChart : lineChart}
        </div>
    )
}

export default Graphs


