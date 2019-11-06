import React from 'react'
import './index.css'
import { render } from 'react-dom'
import { BrowserRouter, Router, Route, Link } from 'react-router-dom'
//don't use "hashHistory" it no longer works
//use "exact" instead of "IndexRoute"
import App from './App'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'

render((
    <BrowserRouter>
      <Route path="/startscreen" component={startscreen} />
      <Route path="/codescreen/:code" component={codescreen} />
      <Route path="/articlegen" component={articlegen} />
    </BrowserRouter>
  ), document.body)


