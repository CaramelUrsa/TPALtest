import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'

ReactDOM.render(<App />, document.getElementById('root'));

class LobbyScreen extends React.Component {
    state = {
        code: 'loading...',
    }

    array = [];

    player = [];

    playerlist = '';

    componentDidMount() {
        this.player = ['inferno', 'snowbrawler', 'novaexplorer', 'bobfreedom'];
        this.setState({
            code: Math.floor(Math.random() * 1000000)
        });
    }

    render() {
        return (
            <div>
                <div class='centered'>
                    <h1>GAME CODE:</h1>
                    <div class='gamecodebox'>
                        <h1 dangerouslySetInnerHTML={{ __html: this.state.code }} />
                    </div>
                    <Link to='/articlegen'>
                       <button class='startbutton'>START GAME</button>
                    </Link>
                </div>
                <div class='playerlist'>
                <ul>
                    <li class='backcolorone' >{this.player[0]}</li>
                    <li class='backcolortwo' >{this.player[1]}</li>
                    <li class='backcolorone' >{this.player[2]}</li>
                    <li class='backcolortwo' >{this.player[3]}</li>
                    <li class='backcolorone' >{this.player[4]}</li>
                    <li class='backcolortwo' >{this.player[5]}</li>
                    <li class='backcolorone' >{this.player[6]}</li>
                    <li class='backcolortwo' >{this.player[7]}</li>
                    <li class='backcolorone' >{this.player[8]}</li>
                </ul>
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