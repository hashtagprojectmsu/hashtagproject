// [REQUIRE] //
const mongoose = require('mongoose')


// [SCHEMA MODEL] //
const thingSchema = mongoose.Schema(
	{},
	{ strict: false }
)


// [EXPORTS] //
module.exports = mongoose.model('Tweet', thingSchema)

