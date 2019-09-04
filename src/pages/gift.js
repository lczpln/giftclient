import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Gift({ match }) {
    const [message, setMessage] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        getMessage()
    }, [])

    async function getMessage() {
        const id = match.params.id || null;

        if (id) {
            try {
                const response = await api.get(`/gift/${id}`);
                console.log(response)
                if (response.data === 'Gift não encontrado ou já destruido.') return setError(true);

                setMessage(response.data)
            } catch (e) {
                return alert("Erro de conexão com a API")
            }
        }
    }

    return (
        <div>
            {error ? (
                <div>
                    Error
                </div>
            ) : (
                    <div>
                        <h3>{message.author}</h3>
                        <h3>{message.message}</h3>
                        <h3>{message.to}</h3>
                    </div>
                )}
        </div>
    );
}
