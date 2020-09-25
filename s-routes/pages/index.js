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
		let chartData = []

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

			chartData.push({ time: timePointB.toLocaleTimeString(), count })
		}
		  
		res.send(chartData)
	}
)


// [EXPORT] //
module.exports = router