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
const TweetModel = require('../../s-models/TweetModel')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


// [MAIN-ROUTE] //
router.get(
	'/',
	async (req, res) => {
		let allHashtagsChartData = []
		let hackChartData = []
		let hackedChartData = []
		let malwareChartData = []

		// All Hashtags //
		for (let i = 30; i > 0; i--) {
			// Past Point A
			let timePointA = new Date()
			timePointA.setMinutes(timePointA.getMinutes() - (i + 1))

			// Past Point B
			let timePointB = new Date()
			timePointB.setMinutes(timePointB.getMinutes() - i)

			// [READ-ALL] timePointA < Tweets < timePointB //
			const count = await TweetModel.countDocuments({
				created_at: {
					$gte: timePointA,
					$lt: timePointB
				}
			})

			allHashtagsChartData.push({ time: timePointB.toLocaleTimeString(), count })
		}

		// #hack //
		for (let i = 30; i > 0; i--) {
			// Past Point A
			let timePointA = new Date()
			timePointA.setMinutes(timePointA.getMinutes() - (i + 1))

			// Past Point B
			let timePointB = new Date()
			timePointB.setMinutes(timePointB.getMinutes() - i)

			// [READ-ALL] timePointA < Tweets < timePointB //
			const count = await TweetModel.countDocuments({
				'entities.hashtags': { $elemMatch: { text: "hack" } },
				created_at: {
					$gte: timePointA,
					$lt: timePointB
				}
			})

			hackChartData.push({ time: timePointB.toLocaleTimeString(), count })
		}

		// #hacked //
		for (let i = 30; i > 0; i--) {
			// Past Point A
			let timePointA = new Date()
			timePointA.setMinutes(timePointA.getMinutes() - (i + 1))

			// Past Point B
			let timePointB = new Date()
			timePointB.setMinutes(timePointB.getMinutes() - i)

			// [READ-ALL] timePointA < Tweets < timePointB //
			const count = await TweetModel.countDocuments({
				'entities.hashtags': { $elemMatch: { text: "hacked" } },
				created_at: {
					$gte: timePointA,
					$lt: timePointB
				}
			})

			hackedChartData.push({ time: timePointB.toLocaleTimeString(), count })
		}

		// #malware //
		for (let i = 30; i > 0; i--) {
			// Past Point A
			let timePointA = new Date()
			timePointA.setMinutes(timePointA.getMinutes() - (i + 1))

			// Past Point B
			let timePointB = new Date()
			timePointB.setMinutes(timePointB.getMinutes() - i)

			// [READ-ALL] timePointA < Tweets < timePointB //
			const count = await TweetModel.countDocuments({
				'entities.hashtags': { $elemMatch: { text: "malware" } },
				created_at: {
					$gte: timePointA,
					$lt: timePointB
				}
			})

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