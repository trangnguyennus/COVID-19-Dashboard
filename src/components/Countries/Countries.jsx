import React, {useState, useEffect} from 'react';
import { FormControl, NativeSelect } from '@material-ui/core'
import styles from './Countries.module.css'
import { fetchNumberByCountry } from '../../api'

const Countries = ({handleCountryChange}) => {
    const [fetchedCountryName, setFetchedCountryName] = useState([])

    useEffect(() => {
        const fetchedCountryName = async () => {
            setFetchedCountryName(await fetchNumberByCountry())
        }
        fetchedCountryName();
    }, [setFetchedCountryName])
        
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(event) => handleCountryChange(event.target.value)}>
                <option value="">Worldwide</option>
                {fetchedCountryName.map((country, index)=><option key={index} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default Countries