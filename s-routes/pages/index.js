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
const TweetModel = require('../../s-models/TweetModel')


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

		// All Hashtags //
		for (let i = 30; i > 0; i--) {
			// timePointA //
			let timePointA = new Date()
			timePointA.setMinutes(timePointA.getMinutes() - (i + 1))

			// timePointB //
			let timePointB = new Date()
			timePointB.setMinutes(timePointB.getMinutes() - i)

			const count = await tweetsCollection.c_countTimeFrame(
				timePointA,
				timePointB
			)

			allHashtagsChartData.push({
				time: timePointB.toLocaleTimeString(),
				count
			})
		}

		// #hack //
		for (let i = 30; i > 0; i--) {
			// timePointA //
			let timePointA = new Date()
			timePointA.setMinutes(timePointA.getMinutes() - (i + 1))

			// timePointB //
			let timePointB = new Date()
			timePointB.setMinutes(timePointB.getMinutes() - i)

			const count = await tweetsCollection.c_countTimeFrameHashtag(
				timePointA,
				timePointB,
				'hack'
			)

			hackChartData.push({ time: timePointB.toLocaleTimeString(), count })
		}

		// #hacked //
		for (let i = 30; i > 0; i--) {
			// timePointA //
			let timePointA = new Date()
			timePointA.setMinutes(timePointA.getMinutes() - (i + 1))

			// timePointB //
			let timePointB = new Date()
			timePointB.setMinutes(timePointB.getMinutes() - i)

			// [READ-ALL] timePointA < Tweets < timePointB //
			const count = await tweetsCollection.c_countTimeFrameHashtag(
				timePointA,
				timePointB,
				'hacked'
			)

			hackedChartData.push({ time: timePointB.toLocaleTimeString(), count })
		}

		// #malware //
		for (let i = 30; i > 0; i--) {
			// timePointA //
			let timePointA = new Date()
			timePointA.setMinutes(timePointA.getDa() - (i + 1))

			// timePointB //
			let timePointB = new Date()
			timePointB.setMinutes(timePointB.getMinutes() - i)

			// [READ-ALL] timePointA < Tweets < timePointB //
			const count = await tweetsCollection.c_countTimeFrameHashtag(
				timePointA,
				timePointB,
				'malware'
			)

			malwareChartData.push({ time: timePointB.toLocaleTimeString(), count })
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