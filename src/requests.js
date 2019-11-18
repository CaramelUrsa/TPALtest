import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, Switch, useParams, BrowserRouter as Router } from 'react-router-dom'
import startscreen from './startscreen'
import codescreen from './codescreen'
import articlegen from './articlegen'
import { thisTypeAnnotation, thisExpression, tsConstructorType, updateExpression } from '@babel/types';

//class Requests extends React.Component {

/*
    export const getPlayerRooms = (code) =>{
        var list =[];
        const datar = {'room_code':code}
        fetch('http://localhost:3000/getPlayers', {
            method: 'post',
            body: JSON.stringify(datar),
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(json => {
            for(var i=0;i<json.length;i++){
                list.push(json[i].player_name)
            }
            return(list);
        });
        return(list);
    }
    */

export const doAthing = (yeet, hello) => {
    if (hello !== 1) {
        var list = [];
        const data = { "room_code": yeet }
        fetch('http://localhost:3000/roomPlayers', {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => {
                var qwer = [];
                for (var i = 0; i < json.length; i++) {
                    qwer.push(json[i].player_name)
                }
                doAthing(0,1)
            })

    }else{
        return(hello);
    }
    return(hello);
}

//}

//export default Requests;