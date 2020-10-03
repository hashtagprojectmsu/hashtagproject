// [REQUIRE] //
const Twitter = require('twitter')
require('dotenv').config()

// [REQUIRE] Personal //
const config = require('../s-config')


// [TWITTER] //
const client = new Twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token_key: config.access_token_key,
	access_token_secret: config.access_token_secret
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