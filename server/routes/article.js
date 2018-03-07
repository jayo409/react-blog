const express = require('express');
const Router = express.Router();
const model = require('../model/model');
const Article = model.getModel('article') ;
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

Router.post('/postArticle', ( req, res) => {
	const { title, content, category, abstract } = req.body;
	const  myDate= new Date();
	const  date = `${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDate()}`;
	const articleModel = new Article({title, content, date, category, abstract});
	articleModel.save( (err,doc) =>{
		if(!err){
			Article.find( (e,d) =>{
				if( !e ){
					return res.json({code: 1, data: d})
				}
			})
		}
	});
})

Router.post('/uploadImg', upload.single('image'), (req, res) => {
	const imageURL = `${domain}/server/upload/${req.file.filename}`;
	return res.json({code: 1, URL: imageURL})
})


Router.post('/initArticleList', ( req, res ) =>{
	const { category } = req.body;

	if( category === '全部' ){
		Article.find( (e, d) =>{
			if( !e ){
				return res.json({data: d})
			}
		})
	} else {
		Article.find({ category }, (e, d) =>{
			if( !e ){
				return res.json({data: d})
			}
		})	
	}
})

Router.post('/updateArticle', (req, res ) =>{
	const { title, abstract, category, content, _id } = req.body;
	Article.update({_id}, {title, abstract, category, content}, (e,d) =>{
		if(!e){
			return res.json({code: 1})
		}
	})
})

Router.post('/delArticle', (req, res) =>{
	const { id } = req.body;

	Article.remove( {_id : id}, ( e, d ) =>{
		if(!e){
			return res.json({code: 1})
		}
	})
})

module.exports = Router