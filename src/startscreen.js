import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'
import requests from './request'

ReactDOM.render(<App />, document.getElementById('root'));

var nameOfUser = '';


class StartScreen extends React.Component {
    render() {
        return (
            <div>
                <div className='centered' >
                        <button className='startbutton' onClick={requests.createGame}>CREATE GAME</button>
                    <label>
                        User Name:
                        <input type='text' name='username' id='Username'/>
                    </label>
                </div>
                <div className='joinbox'>
                    <Link to='/codescreen'>
                        <button className='startbutton' onClick={this.startGame}>JOIN GAME</button>
                    </Link>
                    <form>
                        <label>
                            Game Code:
                        <input type='text' name='gamecode'/>
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

export default StartScreen;

//ReactDOM.render(
//    <StartScreen />,
//    document.getElementById('root')
//);

