import React from 'react';
import { Card, CardContent, Typography, Grid} from '@material-ui/core'
import styles from './Statistics.module.css'
import CountUp from 'react-countup'
import cx from 'classnames'


const Statictics = ({data: {confirmed, recovered, deaths, lastUpdate}}) => {
    console.log(confirmed);

    if (!confirmed) {
        return "The system is loading!"
    }
    return (
        <div className={styles.container}>
            <Typography variant="h4" className={styles.date}>{new Date(lastUpdate).toDateString()}</Typography>
            <Grid container spacing={3} jutify="flex-start">
            <Grid item component={Card} xs={12} md={3} className={cx(styles.box, styles.total)}>
                    <CardContent>
                        <Typography className={styles.title} gutterBottom>TOTAL CASES</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={confirmed.value}
                                duration={2.5}
                                separator = ','
                            />
                            </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.box, styles.active)}>
                    <CardContent>
                        <Typography className={styles.title} gutterBottom>ACTIVE CASES</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={confirmed.value - recovered.value - deaths.value}
                                duration={2.5}
                                separator = ','
                            />
                            </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.box, styles.discharged)}>
                    <CardContent>
                        <Typography className={styles.title} gutterBottom>DISCHARGED</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end= {recovered.value}
                                duration={2.5}
                                separator = ','
                            />
                            </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.box, styles.deceased)}>
                    <CardContent>
                        <Typography className={styles.title} gutterBottom>DECEASED</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={deaths.value}
                                duration={2.5}
                                separator = ','
                            />
                            </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Statictics