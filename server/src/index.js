const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://Alan:morgan11@ds263571.mlab.com:63571/graph-ql-api', {
	useNewUrlParser: true
}).then(() => {
	console.log('Database successfully connected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./models/Lyric');
require('./models/Song');

app.use('/graphql',expressGraphQL({
	schema,
	graphiql: true
}));

app.listen(5000, () => {
	console.log('App is listening port 5000');
});