const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');
const messageRouter = require('./routes/message');
const musicRouter = require('./routes/music');

app.use( bodyParser.json() );
app.use( '/server', express.static( __dirname ) );
app.use(cookieParser())

app.use('/user', userRouter);
app.use('/article', articleRouter);
app.use('/message', messageRouter);
app.use('/music', musicRouter);

app.listen(8082)