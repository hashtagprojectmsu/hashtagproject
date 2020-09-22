// [REQUIRE] //
const Twitter = require('twitter')
require('dotenv').config()

// [INIT] //
const consumer_key = process.env.TWITTER_CONSUMER_KEY || ''
const consumer_secret = process.env.TWITTER_CONSUMER_SECRET || ''
const access_token_key = process.env.TWITTER_ACCESS_TOKEN_KEY || ''
const access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET || ''


// [TWITTER] //
const client = new Twitter({
	consumer_key: consumer_key,
	consumer_secret: consumer_secret,
	access_token_key: access_token_key,
	access_token_secret: access_token_secret
})


// This is the params or query for what you want see
const params = { q: '#blm is:verified', count: 5 }


async function asyncFunction() {
	// [GET] Twitter Client //
	try {
		const tweets = await client.get('search/tweets', params)
		console.log('tweets', tweets)
	}
	catch (err) { console.log('Error -->', err) }
}


asyncFunction()