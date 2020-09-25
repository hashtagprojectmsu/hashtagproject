/**
 * %%%%%%%%%%%%%%%%%%% *
 * %%% INDEX ROUTE %%% *
 * %%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// [REQUIRE] Personal //
const TweetModel = require('../../s-models/TweetModel')

// [INIT] //
const port = process.env.PORT || 5000
const base_url = process.env.BASE_URL || `http://localhost:${port}`


// [EXPRESS + USE] //
const router = express.Router().use(cors())


// [MAIN-ROUTE] //
router.get(
	'/',
	async (req, res) => {
		// Past Point A
		let pastA = new Date()
		pastA.setHours(pastA.getHours() - 1)

		// Past Point B
		let pastB = new Date()
		pastB.setHours(pastB.getHours() - 0)

		// [LOG] //
		console.log('pastA:', pastA)
		console.log('pastA:', pastB)

		// [READ-ALL] After pastA //
		const data = await TweetModel.countDocuments({
			created_at: {
				$gte: pastA,
				$lt: pastB
			}
		})

		for (let i = 0; i < 10; i++) {
			console.log(i)
		}
		  
		res.send({
			pastA: pastA.toLocaleTimeString(),
			pastB: pastB.toLocaleTimeString(),
			count: data,
		})
	}
)

	
// [BASE-URL-ROUTE] For the socket //
router.get(
	'/get-base-url',
	async (req, res) => { res.send(base_url) }
)


// [EXPORT] //
module.exports = router