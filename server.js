/**
 * %%%%%%%%%%%%%%%%%%%%%%% *
 * %%% HASHTAG PROJECT %%% *
 * %%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const mongoose = require('mongoose')
require('dotenv').config()


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