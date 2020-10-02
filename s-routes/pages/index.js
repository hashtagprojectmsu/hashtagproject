/**
 * %%%%%%%%%%%%%%%%%% *
 * %%% INDEX PAGE %%% *
 * %%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const cors = require('cors')
const express = require('express')
require('dotenv').config()


// [REQUIRE] Personal //
const tweetsCollection = require('../../s-collections/tweetsCollection')
const timeService = require('../../s-services/timeService')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


// [MAIN-ROUTE] //
router.get(
	'/',
	async (req, res) => {
		// [INIT] //
		let allHashtagsChartData = []
		let hackChartData = []
		let hackedChartData = []
		let malwareChartData = []

		const timeFrame = 180
		const timeInterval = 10

		// All Hashtags //
		for (let i = timeFrame; i > 0; i = i - timeInterval) {
			// timePointA & timePointB //
			const timePointA = timeService.pastTimeByMinutes(i + timeInterval)
			const timePointB = timeService.pastTimeByMinutes(i)

			// [READ-ALL] timePointA < Tweets < timePointB & containing hashtag //
			const allHashtagsCount = await tweetsCollection.c_countTimeFrame(
				timePointA,
				timePointB
			)

			// [READ-ALL] timePointA < Tweets < timePointB & containing hashtag //
			const hackCount = await tweetsCollection.c_countTimeFrameHashtag(
				timePointA,
				timePointB,
				'hack'
			)

			// [READ-ALL] timePointA < Tweets < timePointB & containing hashtag //
			const hackedCount = await tweetsCollection.c_countTimeFrameHashtag(
				timePointA,
				timePointB,
				'hacked'
			)

			// [READ-ALL] timePointA < Tweets < timePointB & containing hashtag //
			const malwareCount = await tweetsCollection.c_countTimeFrameHashtag(
				timePointA,
				timePointB,
				'malware'
			)

			// [PUSH] //
			allHashtagsChartData.push({
				time: timePointB.toLocaleTimeString(),
				count: allHashtagsCount
			})

			hackChartData.push({
				time: timePointB.toLocaleTimeString(),
				count: hackCount
			})

			hackedChartData.push({
				time: timePointB.toLocaleTimeString(),
				count: hackedCount
			})

			malwareChartData.push({
				time: timePointB.toLocaleTimeString(),
				count: malwareCount
			})
		}
		  
		res.status(200).send({
			hackChartData,
			hackedChartData,
			malwareChartData,
			allHashtagsChartData
		})
	}
)


// [EXPORT] //
module.exports = router