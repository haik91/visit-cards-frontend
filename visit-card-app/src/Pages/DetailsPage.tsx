import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { VisitCard } from '../types/VisitCard'; 

const API_URL = 'https://localhost:7188/api/VisitCards';

const DetailsPage = () => {
    const { id } = useParams<{ id: string }>(); 

    const [visitCard, setVisitCard] = useState<VisitCard | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null); 

    useEffect(() => {
        // Fetch the visit card details
        const fetchVisitCard = async () => {
            try {
                const response = await axios.get<VisitCard>(`${API_URL}/${id}`);
                const visitCardData = response.data;
                setVisitCard(visitCardData);

                if (visitCardData.image) {
                    if (typeof visitCardData.image === 'string') {
                        setImageSrc(visitCardData.image); 
                    } else if (visitCardData.image instanceof Blob) {
                        setImageSrc(URL.createObjectURL(visitCardData.image));
                    }
                }
            } catch (error) {
                setError('Failed to fetch visit card details.');
                console.error('Fetch error:', error);
            }
        };

        if (id) {
            fetchVisitCard();
        } else {
            setError('Invalid ID parameter.');
        }
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h2>Visit Card Details</h2>
            {visitCard ? (
                <div>
                    <p><strong>ID:</strong> {visitCard.id}</p>
                    <p><strong>First Name:</strong> {visitCard.firstName}</p>
                    <p><strong>Last Name:</strong> {visitCard.lastName}</p>
                    <p><strong>Phone:</strong> {visitCard.phone}</p>
                    <p><strong>Email:</strong> {visitCard.email}</p>
                    {imageSrc && (
                        <div>
                            <strong>Image:</strong>
                            <img src={imageSrc} alt="Visit Card" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DetailsPage;
