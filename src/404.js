import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, Switch, useParams, BrowserRouter as Router } from 'react-router-dom'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'
import { thisTypeAnnotation, thisExpression, tsConstructorType, updateExpression } from '@babel/types';
import { async } from 'q';

class Page404 extends React.Component {
    render() {
        return(
            <h1> <strike>:.|:;</strike> This page has been <b>Lossed</b></h1>
        )
    }
}

export default Page404;