/**
 * %%%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% TWEETS COLLECTION %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%%% *
 * 
 * Timeline Example (X: time)
 * <----(timePointA)-----(timePointB)---->
*/
// [REQUIRE] //
require('dotenv').config()


// [REQUIRE] Personal //
const TweetModel = require('../s-models/TweetModel')


/******************* [CRUD] *******************/
const recentTweets = async (timePointA, timePointB) => {
	// [READ-ALL] verfied + time frame //
	const tweets = await TweetModel.find({
		'user.verified': true,
		created_at: {
			$gte: timePointA,
			$lte: timePointB
		}
	}).limit(5)

	return tweets
}


// [READ] Popular tweet within a timeframe //
const popularTweetWithinTime = async (timePointA, timePointB) => {
	// [READ-ALL] timePointA < Tweets < timePointB //
	const count = await TweetModel.countDocuments({
		created_at: {
			$gte: timePointA,
			$lte: timePointB
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
			$lte: timePointB
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
			$lte: timePointB
		}
	})

	return count
}


// [EXPORT] //
module.exports = {
	recentTweets,
	popularTweetWithinTime,
	c_countTimeFrame,
	c_countTimeFrameHashtag,
}