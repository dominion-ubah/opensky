import { BASE_API_URL } from '../helpers/customConfig';
import { userService } from './user.service';

export const homeService = {
    getStates,
    getOneState,
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



function getOneState(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    // call `/users/authenticate` with requestOptions to authenticate the login process
    return fetch(`${BASE_API_URL.baseDev}state/${id}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log('us', data)
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
