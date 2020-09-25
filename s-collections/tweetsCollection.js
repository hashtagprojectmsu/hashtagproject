/**
 * %%%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ADMINS COLLECTION %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const mongoose = require('mongoose')
require('dotenv').config()


// [REQUIRE] Personal //
const TweetModel = require('../s-models/TweetModel')


/******************* [COUNT] *******************/
const c_countTimeFrame = async (timePointA, timePointB) => {
	// [READ-ALL] timePointA < Tweets < timePointB //
	const count = await TweetModel.countDocuments({
		created_at: {
			$gte: timePointA,
			$lt: timePointB
		}
	})

	return count
}

const c_countTimeFrameHashtag = async (timePointA, timePointB, hashtag) => {
	// [READ-ALL] timePointA < Tweets < timePointB //
	const count = await TweetModel.countDocuments({
		'entities.hashtags': { $elemMatch: { text: hashtag } },
		created_at: {
			$gte: timePointA,
			$lt: timePointB
		}
	})

	return count
}


// [EXPORT] //
module.exports = {
	c_countTimeFrame,
	c_countTimeFrameHashtag,
}