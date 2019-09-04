import React, { useState } from 'react';
import api from '../api';

export default function Home() {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState('');
    const [data, setData] = useState({
        author: '',
        message: '',
        to: '',
    })

    async function sendMessage() {
        setLoading(true);

        try {
            const response = await api.post('/gift', data)

            if (response.data) {
                const link = `https://giftapi.lucaspellison.now.sh/gift/${response.data.id}`;

                setLink(link);
                setPage(3);
                setLoading(false);
            }
        } catch (e) {
            return alert("Erro de conexão com o servidor, por favor tente mais tarde !");
        }
    }

    function copyToShare() {
        const link = document.querySelector("#link")

        link.select();

        document.execCommand('copy');
    }

    return (
        <div className="animated bounceIn home">
            {(page === 1 && !loading) ?
                (
                    <div style={{ height: '100%' }}>
                        <h3>As vezes uma simples mensagem pode melhorar o dia de alguém.</h3>
                        <h3>Gift4U foi criado para você alegrar o dia da pessoa que ama,
                            seja seu amigo, namorado(a), seu cãozinho... é para todos!
                        </h3>
                        <h3>Clique em entendi, e comece a criar sua mensagem!</h3>
                        <button onClick={() => setPage(2)}>Entendi !</button>
                    </div>
                ) : (page === 2 && !loading) ? (
                    <div className="animated fadeIn" style={{ height: '100%' }}>
                        <div className="form-item">
                            <p>De</p>
                            <input value={data.author} onChange={(e) => setData({ ...data, author: e.target.value })} type="text" placeholder="Seu nome" />
                            <span>Aqui você pode digitar seu nome, ou deixar em branco para uma mensagem anônima.</span>
                        </div>
                        <div className="form-item">
                            <p>Mensagem</p>
                            <textarea value={data.message} placeholder="Sua mensagem." onChange={(e) => setData({ ...data, message: e.target.value })} />
                        </div>
                        <div className="form-item">
                            <p>Para</p>
                            <input type="text" value={data.to} onChange={(e) => setData({ ...data, to: e.target.value })} />
                            <span>Aqui você digita o nome da pessoa especial, que vai ler a mensagem.</span>
                        </div>
                        <button onClick={() => sendMessage()}>Enviar &times;</button>
                    </div>
                ) : (page === 3 && !loading) ? (
                    <div className="form-item">
                        <h3>Tudo pronto !</h3>
                        <h3>Sua mensagem foi gerada com sucesso.</h3>
                        <h3>Agora é só clicar no botão "Copiar" e enviar!</h3>
                        <input id="link" value={link} onChange={() => { }} />
                        <span>Atenção !!! NÂO acesse o link, a mensagem só poderá ser lida uma única vez.</span>
                        <button onClick={() => copyToShare()}>Copiar</button>
                    </div>

                ) : (
                            <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={require('../loading.gif')} alt="" height={'50%'} width={'35%'} />
                            </div>
                        )}
        </div>
    );
}
