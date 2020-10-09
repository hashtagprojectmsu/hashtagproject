// [REQUIRE] //
const Twitter = require('twitter')
require('dotenv').config()

// [REQUIRE] Personal //
const config = require('./s-config/index')


async function asyncFunction() {
	// [GET] Twitter Client //
	try {
		console.log(
			process.env.TWITTER_CONSUMER_KEY,
		)
		
		
		// [TWITTER] //
		const client = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
			access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
		})
		
		
		// This is the params or query for what you want see
		const params = { q: '#blm is:verified', count: 5 }

		const tweets = await client.get('search/tweets', params)
		console.log('tweets', tweets)
	}
	catch (err) { console.log('Error -->', err) }
}


asyncFunction()


