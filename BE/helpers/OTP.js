const axios = require('axios')

function sendCode (contact, message)  {
	axios.post('http://wa.kawandesanusantara.com/wa/send-bulk', {
		contact,
		message
	})
}

module.exports = {sendCode}