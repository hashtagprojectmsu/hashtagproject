// [REQUIRE] //
const mongoose = require('mongoose')
const Twitter = require('twitter')
require('dotenv').config()


// [REQUIRE] Personal //
const TweetModel = require('./models/TweetModel')


// [INIT] //
const consumer_key = process.env.TWITTER_CONSUMER_KEY || ''
const consumer_secret = process.env.TWITTER_CONSUMER_SECRET || ''
const access_token_key = process.env.TWITTER_ACCESS_TOKEN_KEY || ''
const access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET || ''
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/twitter'


// [MONGOOSE-CONNECT] //
mongoose.connect(
	uri,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	(e) => {
		if (e) { console.log(`Mongoose Connection Error --> ${e}`) }
		else { console.log('Mongoose Connected to DB') }
	}
)
mongoose.set('useFindAndModify', false)


// [TWITTER] //
const client = new Twitter({
	consumer_key: consumer_key,
	consumer_secret: consumer_secret,
	access_token_key: access_token_key,
	access_token_secret: access_token_secret
})


// [TWITTER-STREAM] //
const stream = client.stream('statuses/filter', { track: '#blockchain' })


// [TWITTER-DATA] //
stream.on('data', async (event) => {
	// [INIT] //
	let saveThis = event

	// [PROCESS] //
	saveThis.user = saveThis.user.id_str

	// [SAVE] //
	try {
		const tweet = await new TweetModel(saveThis).save()

		console.log(tweet)
	}
	catch (err) { console.log(`Caught Error --> ${err}`) }
})


// [TWITTER-ERROR] //
stream.on('error', function(err) { throw err })