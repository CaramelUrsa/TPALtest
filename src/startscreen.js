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
                    <Link to="codescreen" params={{ code: "yeet" }}>Click Me!</Link>
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
        var playername = document.getElementById('Username').value;
        const data = {"player_name":playername};

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
        .then(window.location.assign("/codescreen"));
    }
}

export default StartScreen;

//ReactDOM.render(
//    <StartScreen />,
//    document.getElementById('root')
//);

