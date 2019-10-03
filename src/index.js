import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { link } from 'fs';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



class GetArticle extends React.Component {

    handleClick = () => {
        alert('test');
    }


    state = {
        title: 'loading...',
        text: 'loading...',
        head: 'loading...',
        interWikiLinks: [],
        links: 'loading...',
        filteredItems: 'loading...',
    }


    componentDidMount() {
        fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&rnnamespace=0&origin=*')
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result.query.random[0].title);
                    this.setState({
                        title: result.query.random[0].title
                    });
                    //this.parseArticle()
                    this.testParse()

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
                    this.cleanUp()
                }
            )
            .catch(console.log)
    }

    testParse() {
        fetch('https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text|headhtml&page=toast&origin=*')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.parse.title);
                    //console.log(result.parse.text['*']);
                    this.setState({
                        text: result.parse.text['*'],
                        head: result.parse.headhtml['*'],
                        title: 'Toast'
                    });
                    this.cleanUp()
                }
            )
            .catch(console.log)
    }

    cleanUp() {
        var sampletext = "<p>words words</p> <a href=thisisalink.org>this is some text that used to be a link</a>"
        var NewText = sampletext.replace('</a>', '')
        NewText.replace(/<a\b[^>]*>/i,"")
        console.log(NewText)
    }

    render() {
        return (
            //<head dangerouslySetInnerHTML={{__html: this.state.head}} />,
            //<div dangerouslySetInnerHTML={{__html: this.state.text}} />
            //<head dangerouslySetInnerHTML={{__html: this.state.testhead}} />,
            //<div dangerouslySetInnerHTML={{__html: this.state.test}} />

            <p>test</p>
        );
    }
}



ReactDOM.render(
    <GetArticle />,
    document.getElementById('root')
);