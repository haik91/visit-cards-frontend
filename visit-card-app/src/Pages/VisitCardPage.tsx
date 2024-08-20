import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { VisitCard } from '../types/VisitCard';

const API_URL = 'https://localhost:7188/api/VisitCards';

const VisitCardPage = () => {
const [visitCards, setVisitCards] = useState<VisitCard[]>([]);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  axios.get<VisitCard[]>(API_URL)
    .then(response => {
        console.log(response);
      setVisitCards(response.data);
    })
    .catch(error => {
      setError('Error fetching visit cards');
      console.error('There was an error fetching the visit cards!', error);
    });
}, []);

const handleDelete = (id: number) => {
  axios.delete(`${API_URL}/${id}`)
    .then(() => {
      setVisitCards(visitCards.filter(card => card.id !== id));
    })
    .catch(error => {
      setError('Error deleting visit card');
      console.error('There was an error deleting the visit card!', error);
    });
};

return (
  <div>
    <h1>Visit Card List</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <Link to="/create">Create New Visit Card</Link>
    <ul>
      {visitCards.length === 0 ? (
        <p>No visit cards available.</p>
      ) : (
        visitCards.map(card => (
          <li key={card.id}>
            {card.firstName} {card.lastName} - {card.phone} - {card.email}
            <Link to={`/details/${card.id}`}> View</Link>
            <Link to={`/update/${card.id}`}> Edit</Link>
            <button onClick={() => handleDelete(card.id)}>Delete</button>
          </li>
        ))
      )}
    </ul>
  </div>
);
};

export default VisitCardPage;