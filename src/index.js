import React from 'react'
import './index.css'
import { render } from 'react-dom'
import { BrowserRouter, Router, Route, Link, Switch } from 'react-router-dom'
//don't use "hashHistory" it no longer works
//use "exact" instead of "IndexRoute"
import App from './App'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'
import questionscreen from './questioning'
import Page404 from './404'

render((
    <BrowserRouter>
    <Switch>
      <Route path="/startscreen" component={startscreen} />
      <Route path="/codescreen/:code/:id" component={codescreen} />
      <Route path="/articlegen/:code/:id" component={articlegen} />
      <Route path="/questionscreen/:code/:id" component={questionscreen} />
      <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  ), document.body)


