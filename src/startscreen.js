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
        this.joinGame = this.joinGame.bind(this);
        this.createGame = this.createGame.bind(this);
    }

    async createGame() {
        var playername = document.getElementById('Username').value;
        if (playername === '') {
            this.settername("Enter a valid name");
        } else {
            const data = { "player_name": playername };

            fetch('http://localhost:3000/room', {
                method: 'post',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(json => {
                    const datap = {
                        "room_code": json.room_code
                    }
                    console.log(datap);
                    fetch('http://localhost:3000/roomPlayers', {
                        method: 'post',
                        body: JSON.stringify(datap),
                        headers: { 'Content-Type': 'application/json' },
                    })
                        .then(res => res.json())
                        .then(json => {
                            var leng = json.length
                            for (var i = 0; i < leng; i++) {
                                if (json[i].player_name === playername) {
                                    window.location.assign("/codescreen/" + json[i].room_code + "/" + json[i].idplayers)
                                }
                            }
                        })
                })

        }
    }

    async joinGame(func) {
        var roomcode = document.getElementById('Gamecode').value;
        var playername = document.getElementById('Username').value;
        const datar = { 'room_code': roomcode }
        if (roomcode === '') {
            this.settercode('Enter a valid room code')
        } else {
            this.settercode('')
        }
        if (playername === '') {
            this.settername('Enter a valid name')
        } else {
            this.settername()
        }
        if (playername !== '' && roomcode !== '') {

            fetch('http://localhost:3000/grooms', {
                method: 'post',
                body: JSON.stringify(datar),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(json => {
                    var listorooms = [];
                    for (var i = 9; i < json.length; i++) {
                        listorooms.push(json[i].roomcode);
                    }
                    if (listorooms.indexOf(roomcode) > -1) {
                        fetch('http://localhost:3000/roomPlayers', {
                            method: 'post',
                            body: JSON.stringify(datar),
                            headers: { 'Content-Type': 'application/json' },
                        })
                            .then(res => res.json())
                            .then(json => {
                                if (json.length >= 10) {
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
                                        fetch('http://localhost:3000/player', {
                                            method: 'post',
                                            body: JSON.stringify(data),
                                            headers: { 'Content-Type': 'application/json' },
                                        })
                                            .then(res => res.json())
                                            .then(json => {
                                                const datar = {
                                                    'room_code': json.room_code
                                                }
                                                fetch('http://localhost:3000/roomPlayers', {
                                                    method: 'post',
                                                    body: JSON.stringify(datar),
                                                    headers: { 'Content-Type': 'application/json' },
                                                })
                                                    .then(res => res.json())
                                                    .then(json => {
                                                        for (var i = 0; i < json.length; i++) {
                                                            if (json[i].player_name === playername) {
                                                                window.location.assign("/codescreen/" + json[i].room_code + "/" + json[i].idplayers)
                                                            }
                                                        }
                                                    })
                                            })
                                        //.then(json => window.location.assign("/codescreen/" + json.room_code + "/" + json.idplayers));
                                    }
                                }
                            });
                    } else {
                        this.settercode("Room: " + roomcode + " doesnt exist")
                    }
                })
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