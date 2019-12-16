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
            current: 'Loading...',
        };
        this.scanArticles = this.scanArticles.bind(this);
        this.playerscan = this.playerscan.bind(this);
        this.accept = this.accept.bind(this);
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

    accept() {
        var acceptlist = this.state.current.aproval.split(",");
        acceptlist.push(this.myCode)
        const data = {
            "field": this.state.current.idarticles,
            "aprove": acceptlist.toString()
        }
        console.log(data);
        fetch('http://localhost:3000/aprove', {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
    }

    playerscan(data) {
        var list = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].player_id !== this.myCode) {
                if (!data.aproval) {
                    if (data[i].aproval.split(",").includes(this.myCode)) {

                    } else {
                        list.push(data[i])
                    }
                }
            }
            this.setState({
                QuestionList: list,
            })
        }
        console.log(list)
        if (list.length === 0) {
            this.setState({
                currentQ: "Please wait..."
            })
        } else {
            this.setState({
                currentQ: list[0].article_name,
                current: list[0]
            })
        }
    }


    randomArticle = '';

    render() {

        return (
            <div class='centered'>
                <h1>{this.state.message}
                    <br />
                    "{this.state.currentQ}"</h1>
                <button className='startbutton' onClick={this.accept}>NO</button><button className='startbutton' onClick={this.decline}>YES</button>
            </div>
        );
    }
}

export default Questioning;