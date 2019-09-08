import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { homeService } from '../services/homepage.service';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


export class HomePage extends Component {

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
                    <FlightGrid />
                </Container>
            </React.Fragment>
        );
    }
}


export function FlightGrid() {
    const classes = useStyles();
    const [countries, setCountry] = useState(0);

    // let labels = [
    //     "icao24",
    //     "callsign",
    //     "origin_country",
    //     "time_position",
    //     "last_contact",
    //     "longitude",
    //     "latitude",
    //     "baro_altitude",
    //     "on_ground",
    //     "velocity",
    //     "true_track",
    //     "vertical_rate",
    //     "sensors",
    //     "geo_altitude",
    //     "squawk",
    //     "spi",
    //     "position_source",
    // ]
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        homeService.getStates().then(data => {
            console.log("new stuffs")
            data.map(e => { 
                let d =[]
                if(!d.length) {
                    d.push(e)
                }
                return e[2] })
            console.log("new stuff", data.map(e => { return e[2] }))
            setCountry(data.map(e => { return e[2] }))
        })
        // Update the document title using the browser API
        // document.title = `You clicked ${countries} times`;
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                {/* <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>xs=12 sm=6</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>xs=12 sm=6</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid> */}
                {
                    countries ? countries.map((country, i) => {
                        return (
                            <Grid key={i} item xs={12} sm={6} md={3} lg={3}>
                                <Paper className={classes.paper}>{country}</Paper>
                            </Grid>
                        )
                    }) : ""
                }
            </Grid>
        </div>
    );
}