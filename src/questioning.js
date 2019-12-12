import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'

class Questioning extends React.Component {

    constructor(props) {
        super(props)
        this.code = props.match.params.code;
        this.myCode = props.match.params.id;
        this.state = {
            QuestionList: [],
            message: 'Do you know what this is:',
            answered: [],
            currentQ: 'Loading...',
        };
        this.scanArticles = this.scanArticles.bind(this);
        this.playerscan = this.playerscan.bind(this);
    }

    componentDidMount() {
        var art = this.scanArticles;
        setInterval(function () { art() }, 500);
    }

    scanArticles() {
        const data = {
            "room_code": this.code
        }
        fetch('http://localhost:3000/groomticle', {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => this.playerscan(json))
    }

    playerscan(data) {
        var list = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].player_id !== this.myCode) {
                if (data[i].decline === "0") {
                    if (!data.aproval) {
                        list.push(data[i])
                    } else {
                        if (data.aproval.indexOf(this.myCode) <= 0) {
                            list.push(data[i])
                        }
                    }
                }
            }
            this.setState({
                QuestionList: list,
            })
        }
        console.log(list[0].article_name)
        this.setState({
            currentQ: list[0].article_name,
        })
    }


    randomArticle = '';

    render() {

        return (
            <div class='centered'>
                <h1>{this.state.message}
                <br/>
                "{this.state.currentQ}"</h1>
                <button className='startbutton' onClick={this.accept}>NO</button><button className='startbutton' onClick={this.decline}>YES</button>
            </div>
        );
    }
}

export default Questioning;