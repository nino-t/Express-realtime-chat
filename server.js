const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = require('express')()
const http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const DB_URI = 'mongodb://root:root@ds139690.mlab.com:39690/chat_db'

// Model
var Message = mongoose.model('Message', {
	name: String,
	message: String
})

app.get('/message', (req, res) => {
	Message.find({}, (err, messages) => {
		res.send(messages)
	})	
})

app.post('/message', (req, res) => {
	var message = new Message(req.body);

	message.save((err) => {
		if (err)
			sendStatus(500)

		io.emit('message', req.body)
		res.sendStatus(200)		
	})
})

io.on('connection', function(socket){
	console.log('a user connected');
})

mongoose.connect(DB_URI, (err) => {
	console.log('a user connected', err)
})

const server = http.listen(3000, () => {
	console.log('Server is running on port', server.address().port)
})