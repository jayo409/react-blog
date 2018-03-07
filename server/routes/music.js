const express = require('express');
const Router = express.Router();
const model = require('../model/model');
const Music = model.getModel('music') ;
const multer = require('multer');
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

Router.get('/initMusic', (req, res) =>{
	Music.find( (err, doc) =>{
		if( !err ){
			return res.json({code: 0, data: doc})
		}
	})
})

Router.post('/addMusic', (req, res) =>{
	const { title, author, cover, content } = req.body;
	const musicModel = new Music({ title, author, cover, content });
	musicModel.save( (err, doc) =>{
		if( !err ){
			return res.json({ code: 0 })
		}
	})
})

Router.post('/uploadImg', upload.single('image'), (req, res) => {
	const imageURL = `${domain}/server/upload/${req.file.filename}`;
	return res.json({code: 1, URL: imageURL})
})

Router.post('/uploadMusic', upload.single('music'), (req, res) => {
	const musicURL = `${domain}/server/upload/${req.file.filename}`;
	return res.json({code: 0, URL: musicURL})
})

Router.post('/delMusic', (req, res) =>{
	const { id } = req.body;
	Music.remove( {_id : id}, ( e, d ) =>{
		if(!e){
			return res.json({ code: 0 })
		}
	})
})

module.exports = Router