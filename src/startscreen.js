import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'

ReactDOM.render(<App />, document.getElementById('root'));


class StartScreen extends React.Component {
    render() {
        return (
            <div>
                <div class='centered' >
                    <Link to='/codescreen'>
                        <button class='startbutton' onClick={this.startGame}>CREATE GAME</button>
                    </Link>
                </div>
                <div class='joinbox'>
                    <Link to='/codescreen'>
                        <button class='startbutton' onClick={this.startGame}>JOIN GAME</button>
                    </Link>
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

export default StartScreen;

//ReactDOM.render(
//    <StartScreen />,
//    document.getElementById('root')
//);

