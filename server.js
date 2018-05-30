const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = require('express')()
const http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.Promise = Promise

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

app.post('/message', async(req, res) => {
	try {
		var message = new Message(req.body)
		var savedMessage = await message.save()

		var censored = await Message.findOne({ message: 'kasar' })
		if (censored)
			await Message.remove({ _id: censored.id })
		else
			io.emit('message', req.body)

		res.sendStatus(200)
	} catch(e) {
		sendStatus(500)
		return console.log(err)
	} finally {
		console.log('Process is finish')
	}
})

io.on('connection', function(socket){
	console.log('a user connected');
})

mongoose.connect(DB_URI, (err) => {
	console.log('mongoose is connected', err)
})

const server = http.listen(3000, () => {
	console.log('Server is running on port', server.address().port)
})