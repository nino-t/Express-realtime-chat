var request = require('request')

describe('calc', () => {
	it('should multiply 2 and 2', function() {
		expect(2*2).toBe(4)
	})
})

describe('get messages', () => {
	it('should return 200 ok', function(done) {
		request.get('http://localhost:3000/message', (err, res) => {
			expect(res.statusCode).toEqual(200)
			done()
		})
	})

	it('should return not empty', function(done) {
		request.get('http://localhost:3000/message', (err, res) => {
			expect(JSON.parse(res.body).length).toBeGreaterThan(0)
			done()
		})
	})	
})