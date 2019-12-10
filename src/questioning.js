import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'

class Questioning extends React.Component {

    constructor(props) {
        super(props)
        this.code = props.match.params.code;
        this.myCode = props.match.params.id;
        this.state = {
            PlayerList: ['Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...'],
            message: 'Do you know what this is :'
        };
    }

    randomArticle = '';

    render() {

        return (
            <div>
                <h1 class='centered'>{this.state.message}</h1>
            </div>
        );
    }
}

export default Questioning;