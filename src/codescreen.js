import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, Switch, useParams, BrowserRouter as Router } from 'react-router-dom'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'

//props.match.params.code

//['inferno', 'snowbrawler', 'novaexplorer', 'bobfreedom']


//<Router>
//<Route path="/codescreen/:code" component={LobbyScreen} />
//</Router>

class LobbyScreen extends React.Component {

    componentDidMount() {
        this.createGame()
    }

    constructor(props) {
        super(props);
        this.code = props.match.params.code
        this.playerlist = ['inferno', 'snowbrawler', 'novaexplorer', 'bobfreedom'];
    }

    async createGame() {

        fetch('http://localhost:3000/getPlayers', {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(json => console.log(json))
        
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
                    <li class='backcolorone' >{this.playerlist[0]}</li>
                    <li class='backcolortwo' >{this.playerlist[1]}</li>
                    <li class='backcolorone' >{this.playerlist[2]}</li>
                    <li class='backcolortwo' >{this.playerlist[3]}</li>
                    <li class='backcolorone' >{this.playerlist[4]}</li>
                    <li class='backcolortwo' >{this.playerlist[5]}</li>
                    <li class='backcolorone' >{this.playerlist[6]}</li>
                    <li class='backcolortwo' >{this.playerlist[7]}</li>
                    <li class='backcolorone' >{this.playerlist[8]}</li>
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