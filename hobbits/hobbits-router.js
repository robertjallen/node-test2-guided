const express = require("express")
const Hobbits = require("./hobbits-model")
const db = require("../data/config")

const router = express.Router()

beforeEach(async () => {
	await db.seed.run()
})

afterAll(async () => {
	await db.destroy()
})

router.get("/", async (req, res, next) => {
	try {
		res.json(await Hobbits.find())
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	const {id} = req.params
	try {
		res.json(await Hobbits.findById(id))
	} catch(err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		res.json(await Hobbits.create(req.body))
	} catch(err) {
		next(err)
	}
})

module.exports = router