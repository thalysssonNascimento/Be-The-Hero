import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';

import './style.css';
import api from '../../services/api';

import logo from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        }

        try {
            const response = await api.post('/ongs', data);

            toast.success(`Your access id: ${response.data.id}`, {autoClose: false});

            history.push('/');
        } catch (error) {
            toast.error('Error when registering');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be To Hero" />

                    <h1>Register</h1>
                    <p>Register, enter the platform and help people to find the cases of your NGO.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Log in
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        required
                        maxLength={100}
                        placeholder="name of NGO"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        required
                        maxLength={100}
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                     <InputMask
                        placeholder="Whatsapp"
                        maskChar={null}
                        mask="+99 (99) 9-9999-9999"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                     />
                    <div className="input-group">
                        <input
                            required
                            maxLength={100}
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            required
                            maxLength={2}
                            autoCapitalize=""
                            placeholder="FU"
                            style={{width: 80, textTransform: "uppercase"}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}
