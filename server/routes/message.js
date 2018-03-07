const express = require('express');
const Router = express.Router();
const model = require('../model/model');
const Message = model.getModel('message') ;

Router.post('/postMessage', (req, res) =>{
	const { username, contact, content } = req.body;
	const myDate= new Date();
	const date = `${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDate()} ${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;
	const messageModel = new Message({ username, contact, content, date });
	messageModel.save( (err, doc) =>{
		if( !err ){
			return res.json({code: 0});
		}
	})
})

Router.get('/initMessage', (req, res) =>{
	Message.find( (err, doc) =>{
		if( !err ){
			return res.json({code: 0, data: doc})
		}
	})
})

Router.post('/delMessage', (req, res) =>{
	const { id } = req.body;
	Message.remove( { _id: id }, ( err, doc ) =>{
		if( !err){
			return res.json({ code: 0 })
		}
	})
})

module.exports = Router