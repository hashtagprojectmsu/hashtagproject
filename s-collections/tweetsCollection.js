/**
 * %%%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% TWEETS COLLECTION %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
require('dotenv').config()


// [REQUIRE] Personal //
const TweetModel = require('../s-models/TweetModel')


/******************* [CRUD] *******************/
// [READ] Popular tweet within a timeframe //
const popularTweetWithinTime = async (timePointA, timePointB) => {
	// [READ-ALL] timePointA < Tweets < timePointB //
	const count = await TweetModel.countDocuments({
		created_at: {
			$gte: timePointA,
			$lt: timePointB
		}
	})

	return count
}


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
		$or: [
			// Tweet //
			{
				'entities.hashtags': {
					$elemMatch: { text: { $regex: new RegExp(`\\b${hashtag}\\b`, 'ig') } }
				},
			},
			{
				'extended_tweet.entities.hashtags': {
					$elemMatch: { text: { $regex: new RegExp(`\\b${hashtag}\\b`, 'ig') } }
				},
			},
			// retweet //
			{
				'retweeted_status.entities.hashtags': {
					$elemMatch: { text: { $regex: new RegExp(`\\b${hashtag}\\b`, 'ig') } }
				},
			},
			{
				'retweeted_status.extended_tweet.entities.hashtags': {
					$elemMatch: { text: { $regex: new RegExp(`\\b${hashtag}\\b`, 'ig') } }
				},
			},
			// quoted tweet //
			{
				'quoted_status.entities.hashtags': {
					$elemMatch: { text: { $regex: new RegExp(`\\b${hashtag}\\b`, 'ig') } }
				},
			},
			{
				'quoted_status.extended_tweet.entities.hashtags': {
					$elemMatch: { text: { $regex: new RegExp(`\\b${hashtag}\\b`, 'ig') } }
				},
			},
		],
		
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