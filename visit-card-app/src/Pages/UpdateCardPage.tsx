import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { VisitCard } from '../types/VisitCard';

const API_URL = 'https://localhost:7188/api/VisitCards';

const UpdateCardPage =  () => {
    const { id: paramId } = useParams<{ id: string }>(); 
    const navigate = useNavigate();

    const [id, setId] = useState<number | null>(null); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (paramId) {
            const fetchVisitCard = async () => {
                try {
                    const response = await axios.get<VisitCard>(`${API_URL}/${paramId}`);
                    const visitCard = response.data;

                    console.log('Fetched visitCard:', visitCard);

                    setId(visitCard.id); 
                    setFirstName(visitCard.firstName);
                    setLastName(visitCard.lastName);
                    setPhone(visitCard.phone);
                    setEmail(visitCard.email);

                } catch (error) {
                    setError('Failed to fetch visit card data.');
                    console.error('Fetch error:', error);
                }
            };

            fetchVisitCard();
        } else {
            setError('Invalid ID parameter.');
        }
    }, [paramId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (id === null) {
            console.log(firstName); 
            setError('Visit card ID is not available.');
            return;
        }

        const formData = new FormData();
        formData.append('Id', id.toString()); 
        formData.append('FirstName', firstName);
        formData.append('LastName', lastName);
        formData.append('Phone', phone);
        formData.append('Email', email);
        if (image) {
            formData.append('Image', image);
        }

        try {
            await axios.put(`${API_URL}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('Visit card updated successfully!');
            setError(null);
            setTimeout(() => {
                navigate('/'); // Navigate back to the VisitCardsPage after success
            }, 1000);
        } catch (error) {
            setError('Error updating visit card.');
            setSuccess(null);
            console.error('Update error:', error);
        }
    };

    return (
        <div>
            <h2>Update Visit Card</h2>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                </div>
                <button type="submit">Update Visit Card</button>
            </form>
        </div>
    );
};

export default UpdateCardPage;