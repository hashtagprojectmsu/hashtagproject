/**
 * %%%%%%%%%%%%%%%%%%%%%%%
 * %%% HASHTAG PROJECT %%%
 * %%%%%%%%%%%%%%%%%%%%%%%
*/
// [REQUIRE] //
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

// [REQUIRE] Personal //
const a_ = require('./s-routes/api')
const p_ = require('./s-routes/pages')


// [INIT] Const //
const port = process.env.PORT || 5000
const base_url = process.env.BASE_URL || `http://localhost:${port}`
const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/twitter'


// [EXPRESS + SERVER] //
const app = express()
const server = http.createServer(app)


// [MONGOOSE-CONNECTION] //
mongoose.connect(
	mongo_uri,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, connected) => {
		if (connected) { console.log('Mongoose Connected to DB') }
		else { console.log(`Mongoose Connection Error --> ${err}`) }
	}
)
mongoose.set('useFindAndModify', false)

// [USE] //
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


// [USE] Personal //
app.use('/api', a_)
app.use('/pages', p_)


// [HEROKU] Set Static Folder for Heroku //
if (process.env.NODE_ENV == 'production') {
	app.use(express.static('client/dist'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
	})
}


// [MAIN-ROUTE] //
app.get('/api', async (req, res) => { res.send('API') })

	
// [BASE-URL-ROUTE] For the socket //
app.get('/api/get-base-url', async (req, res) => { res.send(base_url) })


// [LISTEN] //
server.listen(port, () => { console.log(`Server Running on Port: ${port}`) })