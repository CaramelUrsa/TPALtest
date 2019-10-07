import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StickyContainer, Sticky } from 'react-sticky';
//import { link } from 'fs';

ReactDOM.render(<App />, document.getElementById('root'));

class LobbyScreen extends React.Component {
    state = {
        code: 'loading...',
    }

    array = [];

    player = [];

    playerlist = '';

    componentDidMount() {
        this.player[1] = 'inferno';
        this.player[2] = 'snowbrawler';
        this.player[3] = 'novaexplorer';
        this.player[4] = 'bobfreedom';
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
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <LobbyScreen />,
    document.getElementById('root')
);