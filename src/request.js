import React from 'react'
//import ReactDOM from 'react-dom'
import './index.css'
//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
//import App from './App'
//import startscreen from './startscreen'
//import codescreen from './codescreen'
//import articlegen from './articlegen'

const serverUrl = 'http://localhost:3000';

export default class Request extends React.Component {
        async createGame(username) {
        const url = serverUrl + '/room';
        const data = { player_name: username };

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'applications/json'
                }
            });
            const json = await response.json();
            console.log('Success:', JSON.stringify(json));
        } catch (error) {
            console.error('Error:', error);
        }
    }
}


//export default Request;