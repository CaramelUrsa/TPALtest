import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'
//const SUrl = 'http://localhost:3000/room';

ReactDOM.render(<App />, document.getElementById('root'));
var gamecode = '';

class StartScreen extends React.Component {
    
    render() {
        return (
                <div>
                    <div className='centered' >
                            <button className='startbutton' onClick={this.createGame}>CREATE GAME</button>
                        <label>
                            Username: 
                            <input type='text' name='username' id='Username'/>
                        </label>
                    </div>
                    <div className='joinbox'>
                            <button className='startbutton' onClick={this.joinGame}>JOIN GAME</button>
                        <form>
                            <label>
                                Game Code:
                            <input type='text' name='gamecode' id='Gamecode'/>
                            </label>
                        </form>
                    </div>
                </div>
            );
        }

    async createGame() {
        var playername = document.getElementById('Username').value;
        const data = {"player_name":playername};

        fetch('http://localhost:3000/room', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(json => window.location.assign("/codescreen/" + json.roomcode ));
        
    }

    async joinGame() {
        var playername = document.getElementById('Username').value;
        var gamecode = document.getElementById('Gamecode').value;
        const data = {'game_code':gamecode,'player_name':playername};
        var codedname = btoa(playername);

        fetch('http://localhost:3000/player', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(json => window.location.assign("/codescreen/" + json.leader_status + "/" + codedname));
    }
}

export default StartScreen;

//ReactDOM.render(
//    <StartScreen />,
//    document.getElementById('root')
//);

