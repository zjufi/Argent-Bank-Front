function login(email, password) {
    return fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Échec de connexion");
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 200 && data.body && data.body.token) {
                localStorage.setItem('token', data.body.token);
                return data.body.token;
            } else {
                throw new Error(data.message || 'Login failed');
            }
        });
}

export { login };   

function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
}

export { isAuthenticated };