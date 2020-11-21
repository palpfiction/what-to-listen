require('dotenv').config()

const express = require('express')
const port = process.env.PORT || 5000
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const WhatToListen = require('./WhatToListen')

var logStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' })


const app = express()
app.disable('x-powered-by');
const whatToListen = new WhatToListen(process.env.API_KEY)

app.use(cors())
app.use(morgan('tiny',  { stream: logStream }));
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/get-album', async (req, res) => {
	if (!req.query.user) return res.status(400).send("username is required");

	const result = await whatToListen.getAlbumToListen({
		user: req.query.user,
		minPlayCount: req.query.minPlayCount,
		maxPlayCount: req.query.maxPlayCount,
		period: req.query.period
	})

	if (result.error) res.status(500)
	res.send(result)
})

app.listen(port, () => {
	console.info(`
	▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
	█░███░█░████░▄▄▀█▄░▄███▄░▄█▀▄▄▀███░███▄██░▄▄█▄░▄█░▄▄█░▄▄▀█▄░█
	█▄▀░▀▄█░▄▄░█░▀▀░██░█████░██░██░███░███░▄█▄▄▀██░██░▄▄█░██░█░▄█
	██▄█▄██▄██▄█▄██▄██▄█████▄███▄▄████▄▄█▄▄▄█▄▄▄██▄██▄▄▄█▄██▄█▀██
	▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
	`)
	console.info(`Server is listening for requests at port ${port}`)
})
