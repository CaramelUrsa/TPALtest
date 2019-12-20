import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, Switch, useParams, BrowserRouter as Router } from 'react-router-dom'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'
import { thisTypeAnnotation, thisExpression, tsConstructorType, updateExpression } from '@babel/types';
import { async } from 'q';
import {jeff, request} from './request'

//props.match.params.code

//['inferno', 'snowbrawler', 'novaexplorer', 'bobfreedom']


//<Router>
//<Route path="/codescreen/:code" component={LobbyScreen} />
//</Router>

class LobbyScreen extends React.Component {

    componentDidMount(props) {
        this.createGame()
    }

    constructor(props) {
        super(props);
        this.proper = props;
        this.code = props.match.params.code;
        this.state = {
            PlayerList: ['Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...'],
            Chaoslist: ['chaos', 'chaotic', 'more chaos', 'thats enough chaos'],
            IsLeader: 0,
            myName: 'Loading...'
        };
        this.myCode = props.match.params.id;
        this.createGame(this.proper)
        this.DetectStart();
        this.StartGame = this.StartGame.bind(this);
        this.DetectStart = this.DetectStart.bind(this);
    }

    async createGame(prop) {
        var dude = this.setter;
        var leadset = this.leadersetter
        var nameset = this.namesetter
        var props = '';
        if (prop) {
            props = prop
            setInterval(function () { matcher(props, dude, leadset, nameset) }, 500);
            function matcher(props, set, leadset, nameset) {
                var list = [];
                const data = {
                    "room_code": props.match.params.code
                }
                fetch('http://localhost:3000/roomPlayers', {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => res.json())
                    .then(json => {
                        for (var i = 0; i < json.length; i++) {
                            if ((json[i].idplayers).toString() === props.match.params.id) {
                                nameset(json[i].player_name)
                                if (json[i].is_leader === 1) {
                                    leadset(1);
                                } else {
                                    leadset(0);
                                }
                            } else {
                                list.push(json[i].player_name)
                            }
                        }
                        set(list);
                    });
            }
        }
    }

    async doThing() {
        const data = {}
        var res = await(request("grooms", data))
        res = await res.json();
        console.log(res)
    }

    setter = (list) => {

        this.setState({
            PlayerList: list
        })
    }

    namesetter = (list) => {

        this.setState({
            myName: list
        })
    }

    leadersetter = (num) => {

        this.setState({
            IsLeader: num
        })
    }

    async DetectStart() {
        var code = this.code
        var id = this.myCode
        setInterval(function () { detect(code) }, 500);
        function detect(code) {
            const data = {}
            fetch('http://localhost:3000/grooms', {
                method: 'post',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(json => {
                    console.log(code);
                    for (var i = 0; i < json.length; i++) {
                        if (json[i].roomcode === code) {
                            if (json[i].game_start === 1) {
                                window.location.assign("/articlegen/" + code + "/" + id)
                            }
                        }
                    }
                })
        }
    }

    async StartGame() {
        console.log(this.code)
        const data = {
            "room_code": this.code,
            "field": "1"
        }
        fetch('http://localhost:3000/gamestart', {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
    }

    render() {
        return (
            <div>
                <div>
                    <div class='centered'>
                        <h1>GAME CODE:</h1>
                        <p>「{this.state.myName}」</p>
                        <div class='gamecodebox'>
                            <h1>{this.code}</h1>
                        </div>
                        {this.state.IsLeader > 0 &&
                            //<button onClick={this.StartGame} class='startbutton'>START GAME</button>
                            <button onClick={this.doThing} class='startbutton'>TEST</button>
                        }
                    </div>
                    <div class='playerlist'>
                        <p>{this.state.PlayerList.length + 1}/10</p>
                        <ul>
                            <li class='backcolorone' >{this.state.PlayerList[0]}</li>
                            <li class='backcolortwo' >{this.state.PlayerList[1]}</li>
                            <li class='backcolorone' >{this.state.PlayerList[2]}</li>
                            <li class='backcolortwo' >{this.state.PlayerList[3]}</li>
                            <li class='backcolorone' >{this.state.PlayerList[4]}</li>
                            <li class='backcolortwo' >{this.state.PlayerList[5]}</li>
                            <li class='backcolorone' >{this.state.PlayerList[6]}</li>
                            <li class='backcolortwo' >{this.state.PlayerList[7]}</li>
                            <li class='backcolorone' >{this.state.PlayerList[8]}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default LobbyScreen;

//ReactDOM.render(
//    <LobbyScreen />,
//    document.getElementById('root')
//);

/*
                            <li class='backcolorone' >{this.playerlist[0]}</li>
                            <li class='backcolortwo' >{this.playerlist[1]}</li>
                            <li class='backcolorone' >{this.playerlist[2]}</li>
                            <li class='backcolortwo' >{this.playerlist[3]}</li>
                            <li class='backcolorone' >{this.playerlist[4]}</li>
                            <li class='backcolortwo' >{this.playerlist[5]}</li>
                            <li class='backcolorone' >{this.playerlist[6]}</li>
                            <li class='backcolortwo' >{this.playerlist[7]}</li>
                            <li class='backcolorone' >{this.playerlist[8]}</li>
                            */