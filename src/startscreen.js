import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'
//const SUrl = 'http://localhost:3000/room';

ReactDOM.render(<App />, document.getElementById('root'));
var playername = '';
var gamecode = '';

class StartScreen extends React.Component {
    render() {
        return (
                <div>
                    <div className='centered' >
                            <button className='startbutton' onClick={this.createGame}>CREATE GAME</button>
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

    async createGame() {
        var username = document.getElementById('Username').value;
        playername = username;
        const data = {"player_name":username};

        fetch('http://localhost:3000/room', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(function name(json) {
            gamecode = json.roomcode;   
            console.log(gamecode)         
        })
        .then(window.location.assign("/codescreen"))
    }
}

export default StartScreen;

//ReactDOM.render(
//    <StartScreen />,
//    document.getElementById('root')
//);

