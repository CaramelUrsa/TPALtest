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
            playerlist: [],
            leaderNumber: ''
        };
        this.myName = atob(props.match.params.username)
        this.temp = [];
        this.templength = 0;
        //console.log(this.state.playerlist);
        this.createGame(this.state.playerlist, this.myName);
        //var intervalID = window.setInterval(readGames, 1000);
        this.UpdatePlayerlist('yeet');
    }

    async createGame(test, myname) {
        if(test){
            if(myname){
                var Players = test;
                var theName = myname;
                var intervalID = window.setInterval(readGames, 500);
            }
        }
        const code = this.code;

        var doUpdate = this.UpdatePlayerlist;

        function readGames() {
            var leadernumber = '';
            const data = { "wanted_code": code }
            fetch('http://localhost:3000/getPlayers', {
                method: 'post',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(json => this.temp = json)
                .then(json => this.templength = json.length)
            var list = this.temp;
            var nameList = [];
            for (var i = 0; i < this.templength; i++) {
                if(list[i].player_name === theName){
                } else {
                    if(list[i].is_leader === 1){
                        list[i].player_name = '♚ ' + list[i].player_name + ' ♚'
                        nameList.push(list[i].player_name);
                    } else {
                        nameList.push(list[i].player_name);
                    }
                }
            }
            doUpdate(nameList, leadernumber);
        }
    }

    UpdatePlayerlist = (doot, noot) => {
        this.setState({ playerlist: doot });
        this.setState({ leaderNumber: noot })
        console.log(doot);
    };

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
                        <p>{this.state.playerlist.length}/9</p>
                        <ul>
                            <li class='backcolorone' >{this.state.playerlist[0]}</li>
                            <li class='backcolortwo' >{this.state.playerlist[1]}</li>
                            <li class='backcolorone' >{this.state.playerlist[2]}</li>
                            <li class='backcolortwo' >{this.state.playerlist[3]}</li>
                            <li class='backcolorone' >{this.state.playerlist[4]}</li>
                            <li class='backcolortwo' >{this.state.playerlist[5]}</li>
                            <li class='backcolorone' >{this.state.playerlist[6]}</li>
                            <li class='backcolortwo' >{this.state.playerlist[7]}</li>
                            <li class='backcolorone' >{this.state.playerlist[8]}</li>
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