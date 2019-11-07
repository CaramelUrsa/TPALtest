import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, Switch, useParams, BrowserRouter as Router } from 'react-router-dom'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'
import { thisTypeAnnotation, thisExpression } from '@babel/types';

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
            playerlist: ['oneFish','twoFish','redFish','blueFish']
        }
        this.change = this.change.bind(this)
        this.temp = [];
        this.templength = 0;
        this.bob = ['bob','otherbob','notbob','bobb'];
    }


    async createGame() {
        const code = this.code;
        var intervalID = window.setInterval(readGames, 1000);

        function readGames() {
            //console.log(this.playerlist);
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
                nameList.push(list[i].player_name);
            }
            this.temp = nameList;
            console.log(this.playerlist);
        }
    }

    change(ev) {
        this.setState({playerlist: this.bob})
    }

    render() {
        return (
            <div>
                <div>
                    <div class='centered'>
                        <h1>GAME CODE:</h1>
                        <div class='gamecodebox'>
                            <h1>{this.code}</h1>
                        </div>
                        <Link to='/articlegen'>
                            <button class='startbutton'>START GAME</button>
                        </Link>
                    </div>
                    <div class='playerlist'>
                        <ul>
                            {this.state.playerlist.map(item => (
                                <li onChange={this.change} key={item}>{item}</li>
                            ))}
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