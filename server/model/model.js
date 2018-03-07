const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/react-blog';
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL,{useMongoClient:true});

const models = {
	user: {
		account:  { type: String, 'require': true },
		username: { type: String, 'require': true },
		password: { type: String, 'require': true },
		avatar: { type: String, 'require': true }
	},
	article: {
		title:{ type: String, },
		date:{ type: String, },
		category: { type: String },
		abstract:{ type: String },
		content:{ type: String }
	},
	message: {
		username: { type: String },
		date: { type: String },
		contact: { type: String },
		content: { type: String }
	},
	music: {
		title: { type: String },
		author: { type: String },
		cover: { type: String }, 
		content: { type: String }
	}
}

for( let m in models){
	mongoose.model( m, new mongoose.Schema(models[m]) );
}

module.exports = {
	getModel: function( name ){
		return mongoose.model(name);
	}
}