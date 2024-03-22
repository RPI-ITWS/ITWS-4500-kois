import React, { useState } from 'react';

function NewsManager() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [result, setResult] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#fff'); // 背景颜色状态

    const handleInputChange = (e, setter) => setter(e.target.value);

    const handleSubmit = async (e, method) => {
        e.preventDefault();
        let url = 'http://localhost:3000/db';
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };

        if (method === 'POST' || method === 'PUT') {
            options.body = JSON.stringify({ title, ...JSON.parse(body || '{}') });
        }

        if (method === 'GET' || method === 'DELETE') {
            url += title ? `/${title}` : '';
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setResult(JSON.stringify(data, null, 2));
        } catch (error) {
            setResult(`Error: ${error.message}`);
        }
    };

    const changeBackgroundColor = () => {
        const colors = ['#FFC0CB', '#FFD700', '#ADFF2F', '#40E0D0', '#1E90FF', '#9370DB'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
    };

    return (
        <div style={{ backgroundColor: backgroundColor }}>
            <form>
                <label htmlFor="title">Title:</label><br />
                <input type="text" id="title" value={title} onChange={(e) => handleInputChange(e, setTitle)} required /><br />
                <label htmlFor="body">Body (for POST/PUT):</label><br />
                <textarea id="body" value={body} onChange={(e) => handleInputChange(e, setBody)} /><br />
                <button onClick={(e) => handleSubmit(e, 'GET')}>GET</button>
                <button onClick={(e) => handleSubmit(e, 'POST')}>POST</button>
                <button onClick={(e) => handleSubmit(e, 'PUT')}>PUT</button>
                <button onClick={(e) => handleSubmit(e, 'DELETE')}>DELETE</button>
            </form>
            <button onClick={changeBackgroundColor}>Change Background Color</button>
            <pre>{result}</pre>
        </div>
    );
}

export default NewsManager;
