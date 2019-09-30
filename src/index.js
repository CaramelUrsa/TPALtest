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
        title: 'loading...'
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
            }
        )
        .catch(console.log)

       // fetch('https://en.wikipedia.org/w/api.php?action=parse&format=json&page=' + this.state.title)
    }

    //https://en.wikipedia.org/w/api.php?action=parse&format=json&page='title'
    render() {
        return (
            <p>
                {'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=' + this.state.title}
            </p>
        );
    }
}



ReactDOM.render(
    <GetArticle />,
    document.getElementById('root')
);