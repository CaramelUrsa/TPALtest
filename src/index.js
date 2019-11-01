import React from 'react'
import './index.css'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
//don't use "hashHistory" it no longer works
//use "exact" instead of "IndexRoute"
import App from './App'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'

render((
    <Router>
      <Route path="/" component={App}>
        <Route exact component={startscreen} />
        <Route path="about" component={codescreen} />
        <Route path="inbox" component={articlegen} />
      </Route>
    </Router>
  ), document.body)


