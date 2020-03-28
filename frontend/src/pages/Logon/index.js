import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { toast } from 'react-toastify';

import api from '../../services/api';

import './style.css';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('/singin', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {
            toast.error('Invalid login');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Log in</h1>

                    <input
                        required
                        placeholder="Your ID"
                        type="text"
                        name=""
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Sign In</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        New to Be The Hero? Create a new account.
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>
    )
}
