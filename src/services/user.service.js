export const userService = {
    login,
    logout,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    console.log("req", requestOptions, username, password)
    // call `/users/authenticate` with requestOptions to authenticate the login process
    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log('us', user)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    console.log("respo", response)
    if (response.json()) {
        return response.json();
    } else

        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    // location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}
