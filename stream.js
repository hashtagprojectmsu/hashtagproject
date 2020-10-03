// [REQUIRE] //
const mongoose = require('mongoose')
const Twitter = require('twitter')
require('dotenv').config()


// [REQUIRE] Personal //
const config = require('./s-config')
const TweetModel = require('./s-models/TweetModel')


// [MONGOOSE-CONNECT] //
mongoose.connect(
	config.mongoURI,
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
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token_key: config.access_token_key,
	access_token_secret: config.access_token_secret
})


// [TWITTER-STREAM] //
const stream = client.stream('statuses/filter', {
	track: "#hack, #hacked, #malware"
})


// [TWITTER-DATA] //
stream.on('data', async (tweet) => {
	// [INIT] //
	const myTweet = tweet
	
	console.log('Tweet from Stream:', tweet)

	// [FORMAT] CREATED_AT //
	myTweet.created_at = new Date(tweet.created_at)

	// [READ] //
	try {
		// Do not double save a tweet! //
		const foundTweet = await TweetModel.findOne({ id_str: tweet.id_str })

		if (!foundTweet) {
			// [SAVE] //
			await new TweetModel(myTweet).save()
		}
		else { console.log('Tweet already in the database') }
	}
	catch (err) { console.log('Caught Error -->', err) }
})


// [TWITTER-ERROR] //
stream.on('error', (err) => { console.log('Error:', err) })