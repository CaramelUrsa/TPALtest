import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StickyContainer, Sticky } from 'react-sticky';
import { throwStatement } from '@babel/types';
//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
//import startscreen from './startscreen'
//import codescreen from './codescreen'
//import articlegen from './articlegen'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



class GetArticle extends React.Component {


    handleClick1 = () => {
        this.GenRandomArticle();
        this.setState({
            title: "Loading new article...",
            text: "Loading new article..."
        })
    }

    handleClick2 = () => {
        const data = {
            "article_name": this.state.title,
            "player_id": this.myName,
            "room_code": this.code
        }
        fetch('http://localhost:3000/article', {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                })
    }

    constructor(props) {
        super(props)
        this.myName = props.match.params.id;
        this.code = props.match.params.code;
        this.state = {
            title: 'loading...',
            text: 'loading...',
            head: 'loading...',
            interWikiLinks: [],
            links: 'loading...',
            filteredItems: 'loading...',
            cleaned: 'loading...',
            time: 120,
            timer: 'loading...'
        }
        this.handleTimer = this.handleTimer.bind(this);
        this.incrementTime = this.incrementTime.bind(this);
        this.handleTimer()
        this.GenRandomArticle()
    }

    handleTimer() {
         const incTime = this.incrementTime;
        setInterval(function () { doTimer(incTime) }, 1000);
        function doTimer(time) {
            time()
        }
    }

    incrementTime = () => {
        this.setState({
            time: this.state.time - 1,
            timer: this.secondsToClock(this.state.time - 1)
        })
        if(this.state.time < 0) {
            const data = {
                'article_name': this.state.title,
                'player_id': this.state.myName,
                'room_code': this.state.code
            }
            fetch('http://localhost:3000/grooms', {
                method: 'post',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(window.location.assign("/questionscreen/" + this.state.code + "/" + this.state.myName))
        }
    }

    secondsToClock(time) {
        var mins = Math.floor(time / 60);
        var secs = time - (mins * 60)
        if(secs.toString().length < 2){
            secs = "0" + secs.toString()
        }
        return(mins + ":" + secs);
    }

    GenRandomArticle() {
        fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&rnnamespace=0&origin=*')
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result.query.random[0].title);
                    this.setState({
                        title: result.query.random[0].title
                    });
                    this.parseArticle()
                    //this.testParse()

                }
            )
            .catch(console.log)
    }

    parseArticle() {
        fetch('https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text|headhtml&page=' + this.state.title + '&origin=*')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.parse.text['*']);
                    this.setState({
                        text: result.parse.text['*'],
                        head: result.parse.headhtml['*']
                    });
                }
            )
            .catch(console.log)
    }


    render() {
        return (
            <StickyContainer>
                <h1>{this.state.timer}</h1>
                <h1 dangerouslySetInnerHTML={{ __html: this.state.title }} />

                <Sticky >{({ style }) => <div style={style} align='center' class='header'><button class='button' onClick={this.handleClick1}>New Article</button><button class='button' onClick={this.handleClick2}>Confirm Article</button></div>}</Sticky>

                <div dangerouslySetInnerHTML={{ __html: this.state.text.replace(/<\/a>/g, '').replace(/<a\b[^>]*>/g, "") }} />
            </StickyContainer>
        );
    }
}

export default GetArticle;

//ReactDOM.render(
//    <GetArticle />,
//    document.getElementById('root')
//);