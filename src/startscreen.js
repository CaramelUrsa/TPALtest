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

    constructor(props) {
        super(props);
        this.state = {
            errorname: ' ',
            errorcode: ' ',
        };
        // 0 is no error
        // 1 is missing entery
        // 2 is taken/full
        // 3 is invalid
        this.joinGame = this.joinGame.bind(this);
    }

    async createGame() {
        var playername = document.getElementById('Username').value;
        var codedname = btoa(playername);
        const data = { "player_name": playername };

        fetch('http://localhost:3000/room', {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => window.location.assign("/codescreen/" + json.roomcode + "/" + codedname));

    }

    async joinGame(func) {
        var roomcode = document.getElementById('Gamecode').value;
        var playername = document.getElementById('Username').value;
        const datar = { 'room_code': roomcode }
        if (roomcode === '' || playername === '') {
            if (roomcode === '') {
                this.settercode('please enter a room code')
            } else {
                this.settercode()
            };
            if (playername === '') {
                this.settername('please enter a username')
            } else {
                this.settername()
            }
        } else {

            fetch('http://localhost:3000/roomPlayers', {
                method: 'post',
                body: JSON.stringify(datar),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(json => {
                    if (json.length > 9) {
                        console.log("game " + roomcode + " is full")
                        this.settercode('Room ' + roomcode + ' is full');

                    } else {
                        var temp = [];
                        for (var i = 0; i < json.length; i++) {
                            temp.push(json[i].player_name);
                        }
                        if (temp.indexOf(playername) > 0) {
                            console.log("name " + playername + " is taken");
                            this.settername("name " + playername + " is taken");
                        } else {
                            const data = { 'room_code': roomcode, 'player_name': playername };
                            var codedname = btoa(playername);

                            fetch('http://localhost:3000/player', {
                                method: 'post',
                                body: JSON.stringify(data),
                                headers: { 'Content-Type': 'application/json' },
                            })
                                .then(res => res.json())
                                .then(json => window.location.assign("/codescreen/" + json.room_code + "/" + codedname));
                        }
                    }
                });
        }
    }

    settername = (go) => {
        this.setState({
            errorname: go
        })
    }

    settercode = (go) => {
        this.setState({
            errorcode: go
        })
    }


    render() {
        return (
            <div>
                <div className='centered' >
                    <button className='startbutton' onClick={this.createGame}>CREATE GAME</button>
                    <p className='error'>{this.state.errorname}</p>
                    <label>
                        Username:
                            <input type='text' name='username' id='Username' />
                    </label>
                </div>
                <div className='joinbox'>
                    <button className='startbutton' onClick={this.joinGame}>JOIN GAME</button>
                    <form>
                        <p className='error'>{this.state.errorcode}</p>
                        <label>
                            Game Code:
                            <input type='text' name='gamecode' id='Gamecode' />
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