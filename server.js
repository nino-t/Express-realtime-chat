const express = require('express')
const bodyParser = require('body-parser')

const app = require('express')()
const http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var message = [
	{
		name: 'Nino',
		message: 'Hello World'
	}
]

app.get('/message', (req, res) => {
	res.send(message)
})

app.post('/message', (req, res) => {
	message.push(req.body)
	io.emit('message', req.body)
	res.sendStatus(200)
})

io.on('connection', function(socket){
	console.log('a user connected');
})

const server = http.listen(3000, () => {
	console.log('Server is running on port', server.address().port)
})