import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StickyContainer, Sticky } from 'react-sticky';
//import { link } from 'fs';

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
        cleaned: 'loading...'
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
                }
            )
            .catch(console.log)
    }


    render() {
        return (
            <StickyContainer>
                
                    <Sticky >{({ style }) => <div style={style} class='header'>Sticky element</div>}</Sticky>

                <div dangerouslySetInnerHTML={{ __html: this.state.text.replace(/<\/a>/g, '').replace(/<a\b[^>]*>/g, "").replace(/\[.*?\]/) }} />
            </StickyContainer>
        );
    }
}

ReactDOM.render(
    <GetArticle />,
    document.getElementById('root')
);