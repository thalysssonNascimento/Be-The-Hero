import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logo from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId
            }
        }).then( response => {
            setIncidents(response.data)
        })
    }, [ongId]);

    async function handleDeleIncident(id){
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert('Erro ao tentar deletar');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Hero" />
                <span>Welcome, <strong>{ongName}</strong></span>

                <Link className="button" to="/incidents/new">Register new case</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Registered cases</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASE:</strong>
                        <p>{incident.title}</p>

                        <strong>Description</strong>
                        <p>{incident.description}</p>

                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
