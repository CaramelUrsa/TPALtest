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

export const jeff = (boop) => {
    console.log(boop)
}

export const mafs = (num) => {
    var numb2 = 5;
    var numb3 = num + numb2;
    return (numb3)
}


export const request = (url, data) => {
    const res = fetch('http://localhost:3000/' + url + '', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
    return(res)
}