import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, Switch, useParams, BrowserRouter as Router } from 'react-router-dom'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'
import { thisTypeAnnotation, thisExpression, tsConstructorType, updateExpression } from '@babel/types';

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
        this.code = props.match.params.code;
        this.state = {
            PlayerList: ['MrPlaceholder','PlaceholderJoe','PlaceholderJR'],
        };
        this.myName = atob(props.match.params.username);
        this.createGame(this.state.PlayerList, this.myName);
    }

    async createGame(playerlist, myname) {
        if (playerlist) {
            if (myname) {
                var Players = playerlist;
                var UserName = myname;
                var intervalID = window.setInterval(readGames, 100);
            }
        }
        const code = this.code;
        var getplayers = this.GetPlayers;

        function readGames() {
            var leadernumber = '';
            const data = { "room_code": code }
            fetch('http://localhost:3000/getPlayers', {
                method: 'post',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(json => getplayers(json));
        }
    }

    GetPlayers = (tosort) => {
        var sorted = [];
        for(var i = 0; i < tosort.length; i++){
            sorted.push(tosort[i].player_name)
        }
        this.setState({ PlayerList: sorted })
    }

    render() {
        return (
            <div>
                <div>
                    <div class='centered'>
                        <h1>GAME CODE:</h1>
                        <p>「{this.myName}」</p>
                        <div class='gamecodebox'>
                            <h1>{this.code}</h1>
                        </div>
                        <Link to='/articlegen'>
                            <button class='startbutton'>START GAME</button>
                        </Link>
                    </div>
                    <div class='playerlist'>
                        <p>{this.state.PlayerList.length}/10</p>
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