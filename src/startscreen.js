import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StickyContainer, Sticky } from 'react-sticky';
//import { link } from 'fs';

ReactDOM.render(<App />, document.getElementById('root'));


class StartScreen extends React.Component {
    render() {
        return (
            <div>
            <div class='centered' >
            <button class='startbutton' onClick={this.startGame}>CREATE GAME</button>
            </div>
            <div class='joinbox'>
            <button class='startbutton' onClick={this.startGame}>JOIN GAME</button>
                <form>
                    <label>
                        Game Code:
                        <input type='text' name='gamecode' />
                    </label>
                </form>
            </div>
            </div>
        );
    }
}

ReactDOM.render(
    <StartScreen />,
    document.getElementById('root')
);

