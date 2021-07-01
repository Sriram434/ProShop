const bcrypt = require('bcrypt')

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('12345', 10),
		isAdmin: true
	}, 
	{
		name: 'John',
		email: 'john@example.com',
		password: bcrypt.hashSync('12345', 10)
	},
	{
		name: 'Hitman',
		email: 'hitman@example.com',
		password: bcrypt.hashSync('12345', 10)
	},
]

module.exports = users;