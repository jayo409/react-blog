const express = require('express');
const md5 = require('md5');
const Router = express.Router();
const model = require('../model/model');
const multer = require('multer');
const User = model.getModel('user');
const domain = 'http://localhost:8082';
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null,  'server/upload/')
	},
	filename: function (req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
const upload = multer({
	storage: storage
});


Router.post('/register', ( req, res ) =>{
	const { account, password } = req.body;
	User.findOne({account}, (err, doc) =>{
		if( doc ){
			return res.json('用户名重复!');
		}
		const pwd = md5(md5(password));
		const userModel = new User({ account, password: pwd });
		userModel.save((e,d)=>{
			res.cookie('userid', d._id);
			return res.json({code: 0, data: d})
		});
	})
})

Router.post('/signin', ( req, res )=>{
	const { account, password } = req.body;
	const pwd = md5(md5(password));
	User.findOne({account, password: pwd}, (err, doc)=>{
		if( !doc ){
			return res.json('账号或密码错误!');
		}
		res.cookie('userid', doc._id);
		return res.json({code: 0, data: doc});
	})
})

Router.get('/info', ( req, res )=>{
	const { userid } = req.cookies;
	if( !userid ){
		return res.json({code: 1});
	}
	User.findOne({_id: userid}, (err, doc)=>{
		if( !err ){
			res.json({code: 0, data:doc})
		}
	})
})

Router.get('/blogInfo', ( req, res ) =>{
	User.findOne( {account: 'jayo409'}, (err, doc) =>{
		if( doc ){

			res.json({code: 0, data: doc});
		}
	})
})

Router.post('/uploadImg', upload.single('image'), (req, res) => {
	const imageURL = `${domain}/server/upload/${req.file.filename}`;
	return res.json({code: 1, URL: imageURL})
})

Router.post('/updatePwd', (req, res) =>{
	const { oldpassword, newpassword } = req.body;
	const { userid } = req.cookies;
	User.findOne({ _id: userid }, (err, doc) =>{
		if(!err){	
			if( md5(md5(oldpassword)) === doc.password ){
				User.update({_id: userid}, { password: newpassword }, (e,d) =>{
					if( !e ){
						return res.json({code: 0})
					}
					
				})
			} else {
				return res.json({ code: 1})			
			}		
		}
	})
})

Router.post('/updateusername', (req, res) =>{
	const { value } = req.body;
	const { userid } = req.cookies;
	User.update({ _id: userid}, { username: value }, (e, d) =>{
		if( !e ){
			return res.json({ code: 0})
		}
	})
})

Router.post('/updateavatar', (req, res) =>{
	const { value } = req.body;
	const { userid } = req.cookies;
	
	User.update({ _id: userid}, { avatar: value }, (e, d) =>{
		if( !e ){
			return res.json({ code: 0})
		}
	})
})

module.exports = Router