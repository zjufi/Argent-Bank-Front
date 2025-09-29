import React from 'react';
import Form from '../components/form.jsx';
import '../styles/pages/login.scss';


function Login() {
    return (
        <main className='main bg-dark'>
            <section className="login-container">
                {/* Returns form component */}
                < Form />
            </section>
        </main>
    )
}
export default Login;

