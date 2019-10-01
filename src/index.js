import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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
    }


    componentDidMount() {
        fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&rnnamespace=0&origin=*')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.query.random[0].title);
                    this.setState({
                        title: result.query.random[0].title
                    });
                    this.getHTMLhead()
                    this.parseArticle()

                }
            )
            .catch(console.log)
    }

    getHTMLhead() {
        fetch('https://en.wikipedia.org/w/api.php?action=parse&format=json&page=' +this.state.title+ '&prop=headhtml&origin=*')
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result.parse.headhtml['*']);
                this.setState({
                    head: result.parse.headhtml['*']
                });
            }
        )
    }

    parseArticle() {
            fetch('https://en.wikipedia.org/w/api.php?action=parse&format=json&page=' + this.state.title + '&origin=*')
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result.parse.text['*']);
                        this.setState({
                            text: result.parse.text['*']
                        });
                    }
                )
                .catch(console.log)
    }

    //https://en.wikipedia.org/w/api.php?action=parse&format=json&page='title'
    render() {
        return (
            <link rel="stylesheet" href="//en.wikipedia.org/w/load.php?modules=mediawiki.legacy.commonPrint,shared|mediawiki.skinning.elements|mediawiki.skinning.content|mediawiki.skinning.interface|skins.vector.styles|site|mediawiki.skinning.content.parsoid|ext.cite.style&amp;only=styles&amp;skin=vector"/>,
            <head dangerouslySetInnerHTML={{__html: this.state.head}} />,
            <body dangerouslySetInnerHTML={{__html: this.state.text}} />
        );
    }
}



ReactDOM.render(
    <GetArticle />,
    document.getElementById('root')
);