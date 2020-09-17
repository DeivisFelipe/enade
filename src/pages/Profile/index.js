import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidets] = useState([
    {
      id:0,
      title:'Titulo 01',
      description:'Descrição 01',
      value: 10
    },
    {
      id:1,
      title:'Titulo 02',
      description:'Descrição 02',
      value: 10
    },
    {
      id:2,
      title:'Titulo 03',
      description:'Descrição 03',
      value: 10
    },
    {
      id:3,
      title:'Titulo 04',
      description:'Descrição 04',
      value: 10
    }
  ]);
  const ongName = "Ong Teste"
  const history = useHistory();

  function handleDeleteIncident(id) {
      setIncidets(incidents.filter(incident => incident.id !== id));
  }

  function handleLogout() {
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button 
          onClick={handleLogout} 
          type="button"
        >
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos castrados</h1>
      
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO: {incident.id}</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

            <button 
              onClick={() => handleDeleteIncident(incident.id)}
              type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
        
      </ul>
    </div>
  );
}