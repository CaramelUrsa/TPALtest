import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'
import request from './request'

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/startscreen" component={startscreen} />
            <Route path="/codescreen" component={codescreen} />
            <Route path="/articlegen" component={articlegen} />
            <Route path="/request" component={request} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));


