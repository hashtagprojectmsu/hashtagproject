/**
 * %%%%%%%%%%%%%%%%%%%%%%% *
 * %%% HASHTAG PROJECT %%% *
 * %%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const mongoose = require('mongoose')
const Twitter = require('twitter')
require('dotenv').config()


// [TWITTER] //
var client = new Twitter({
	consumer_key: process.env.CONSUMER_KEY || '',
	consumer_secret: process.env.CONSUMER_SECRET || '',
	access_token_key: process.env.ACCESS_TOKEN_KEY || '',
	access_token_secret: process.env.ACCESS_TOKEN_SECRET || ''
})
  
var params = { screen_name: 'nodejs' }

client.get('statuses/user_timeline', params, function(error, tweets, response) {
	// If No Error //
	if (!error) { console.log(tweets) }
})


// [MONGOOSE-CONNECT] //
mongoose.connect(
	process.env.MONGO_URI,
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