import { BASE_API_URL } from '../helpers/customConfig';
import { userService } from './user.service';

export const homeService = {
    getStates,
    getArrivalByAirport,
    getDepartureByAirport
};

function getStates() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    // call `/users/authenticate` with requestOptions to authenticate the login process
    return fetch(`${BASE_API_URL.baseDev}states/all`, requestOptions)
        // .then(handleResponse)
        .then(res => {
            return res.json();
        }

        )
        .then(data => {
            console.log('us', data)
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            return data.states;
        });
}



function getArrivalByAirport(endtime, icao) {


    const requestOptions = {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        agent: null,
        headers: {
            // "Content-Type": "text/plain",
            'Authorization': 'Basic ' + btoa('demo:demo'),
        },
        // method: 'GET',
        // headers: { 'Content-Type': 'application/json' }
    };
    let timeSt = new Date().setMinutes(new Date().getMinutes() - endtime)
    const secondsSinceEpoch = Math.round(timeSt / 1000)
    const dsecondsSinceEpoch = Math.round(Date.now() / 1000)

    console.log("new stuffxx", timeSt, icao, Date.now())
    // call `/users/authenticate` with requestOptions to authenticate the login process
    // return fetch(`https://opensky-network.org/api/flights/arrival?airport=${icao}&begin=${timeSt}&end=${Date.now()}`, requestOptions)
    return fetch('https://opensky-network.org/api/flights/arrival?airport=' + icao + '&begin=' + parseInt(secondsSinceEpoch) + '&end=' + parseInt(dsecondsSinceEpoch), requestOptions)
        .then(res => res.clone().json())
        .then(data => {
            console.log('json arrival', data)
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            return data;
        });
}
function getDepartureByAirport(endtime, icao) {


    const requestOptions = {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        agent: null,
        headers: {
            // "Content-Type": "text/plain",
            'Authorization': 'Basic ' + btoa('demo:demo'),
        },
        // method: 'GET',
        // headers: { 'Content-Type': 'application/json' }
    };
    let timeSt = new Date().setMinutes(new Date().getMinutes() - endtime)
    const secondsSinceEpoch = Math.round(timeSt / 1000)
    const dsecondsSinceEpoch = Math.round(Date.now() / 1000)

    console.log("new stuffxx", timeSt, icao, Date.now())
    // call `/users/authenticate` with requestOptions to authenticate the login process
    // return fetch(`https://opensky-network.org/api/flights/arrival?airport=${icao}&begin=${timeSt}&end=${Date.now()}`, requestOptions)
    return fetch('https://opensky-network.org/api/flights/departure?airport=' + icao + '&begin=' + parseInt(secondsSinceEpoch) + '&end=' + parseInt(dsecondsSinceEpoch), requestOptions)
        .then(res => res.clone().json())
        .then(data => {
            console.log('json dept', data)
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            return data;
        });
}




function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    console.log("respo", response)
    if (response.json()) {
        console.log("res", response.body)
        // return response.json();
    } else

        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    userService.logout();
                    // location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}
